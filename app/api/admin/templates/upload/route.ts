import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth'
import { cookies } from 'next/headers'

export const dynamic = 'force-static'
function parseCsvRow(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') inQuotes = !inQuotes
    else if (inQuotes) cur += c
    else if (c === ',') {
      out.push(cur.trim())
      cur = ''
    } else cur += c
  }
  out.push(cur.trim())
  return out
}

function stringifyCsvRow(values: string[]): string {
  return values.map(v => {
    if (v.includes(',') || v.includes('"') || v.includes('\n')) {
      return `"${v.replace(/"/g, '""')}"`
    }
    return v
  }).join(',')
}

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const route = formData.get('route') as string
    let templateId = formData.get('templateId') as string
    const file = formData.get('file') as File

    if (!route || !templateId || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!file.name.endsWith('.tsx')) {
      return NextResponse.json({ error: 'File must be a .tsx file' }, { status: 400 })
    }

    // Sanitize templateId: allow only letters, numbers, underscore, hyphen
    templateId = templateId.replace(/[^a-zA-Z0-9_-]/g, '')
    if (!templateId) {
      return NextResponse.json({ error: 'Invalid templateId after sanitization' }, { status: 400 })
    }

    const templatesDir = path.join(process.cwd(), 'src', 'templates')
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true })
    }

    const templatePath = path.join(templatesDir, `${templateId}.tsx`)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(templatePath, buffer)

    // Update src/data/page-registry.csv
    const registryPath = path.join(process.cwd(), 'src', 'data', 'page-registry.csv')
    if (!fs.existsSync(registryPath)) {
      return NextResponse.json({ error: 'Registry file not found' }, { status: 500 })
    }

    const raw = fs.readFileSync(registryPath, 'utf-8')
    const lines = raw.split(/\r?\n/)
    const header = parseCsvRow(lines[0])
    const routeIndex = header.indexOf('route')
    const templateIdIndex = header.indexOf('templateId')

    if (routeIndex === -1 || templateIdIndex === -1) {
      return NextResponse.json({ error: 'Invalid registry CSV structure' }, { status: 500 })
    }

    const normalizedRoute = route === '/' ? '/' : route.replace(/\/$/, '')
    let found = false
    const newLines = lines.map((line, i) => {
      if (i === 0 || !line.trim()) return line
      const values = parseCsvRow(line)
      if (values[routeIndex] === normalizedRoute) {
        values[templateIdIndex] = templateId
        found = true
        return stringifyCsvRow(values)
      }
      return line
    })

    if (!found) {
      return NextResponse.json({ error: `Route "${normalizedRoute}" not found in registry` }, { status: 404 })
    }

    fs.writeFileSync(registryPath, newLines.join('\n'))

    // Regenerate src/templates/uploadedRegistry.generated.ts
    const files = fs.readdirSync(templatesDir)
    const tsxFiles = files.filter(f => f.endsWith('.tsx') && fs.statSync(path.join(templatesDir, f)).isFile())
    
    const generatedPath = path.join(templatesDir, 'uploadedRegistry.generated.ts')
    
    let content = "import { ComponentType } from 'react'\n"
    tsxFiles.forEach((f, idx) => {
      const id = f.replace('.tsx', '')
      content += `import Template_${idx} from './${id}'\n`
    })
    
    content += "\nexport const UPLOADED_TEMPLATE_BY_ID: Record<string, ComponentType<any>> = {\n"
    tsxFiles.forEach((f, idx) => {
      const id = f.replace('.tsx', '')
      content += `  '${id}': Template_${idx},\n`
    })
    content += "}\n\n"
    content += "export function getUploadedTemplate(templateId: string): ComponentType<any> | undefined {\n"
    content += "  return UPLOADED_TEMPLATE_BY_ID[templateId]\n"
    content += "}\n"

    fs.writeFileSync(generatedPath, content)

    return NextResponse.json({ 
      ok: true, 
      route: normalizedRoute, 
      templateId, 
      templatePath: `src/templates/${templateId}.tsx` 
    })

  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
