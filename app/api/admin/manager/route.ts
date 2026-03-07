import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

export const dynamic = 'force-static'
const execAsync = promisify(exec);

const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
const CSV_PATH = path.join(process.cwd(), 'src', 'data', 'page-registry.csv');

function getFilesRecursively(dir: string, baseDir: string, extension: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir, extension));
    } else {
      if (file.endsWith(extension)) {
        const relativePath = path.relative(baseDir, fullPath);
        // Strip extension
        results.push(relativePath.replace(new RegExp(`\\${extension}$`), '').replace(/\\/g, '/'));
      }
    }
  }
  return results;
}

export async function GET() {
  try {
    const templates = getFilesRecursively(TEMPLATES_DIR, TEMPLATES_DIR, '.tsx');
    const content = getFilesRecursively(CONTENT_DIR, CONTENT_DIR, '.ts');

    return NextResponse.json({ templates, content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const route = formData.get('route') as string;
    const templateId = formData.get('templateId') as string;
    const contentKey = formData.get('contentKey') as string;
    const pageTitle = formData.get('pageTitle') as string;
    const fileRef = formData.get('fileRef') as string;
    const templateFile = formData.get('templateFile') as File | null;
    const contentFile = formData.get('contentFile') as File | null;

    if (!route) {
      return NextResponse.json({ error: 'Route is required' }, { status: 400 });
    }

    // Save template file if provided
    if (templateFile) {
      const buffer = Buffer.from(await templateFile.arrayBuffer());
      const filePath = path.join(TEMPLATES_DIR, templateFile.name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);
    }

    // Save content file if provided
    if (contentFile) {
      const buffer = Buffer.from(await contentFile.arrayBuffer());
      const filePath = path.join(CONTENT_DIR, contentFile.name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, buffer);
    }

    // Update CSV
    if (fs.existsSync(CSV_PATH)) {
      let csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
      const lines = csvContent.split(/\r?\n/);
      if (lines.length > 0) {
        const headers = lines[0].split(',');
        const routeIdx = headers.indexOf('route');
        const templateIdx = headers.indexOf('templateId');
        const contentIdx = headers.indexOf('contentKey');
        const titleIdx = headers.indexOf('pageTitle');
        const fileRefIdx = headers.indexOf('fileRef');

        if (routeIdx !== -1 && templateIdx !== -1 && contentIdx !== -1) {
          let found = false;
          const updatedLines = lines.map((line, index) => {
            if (index === 0) return line;
            if (!line.trim()) return line;
            const columns = line.split(',');
            if (columns[routeIdx] === route) {
              columns[templateIdx] = templateId;
              columns[contentIdx] = contentKey;
              if (titleIdx !== -1 && pageTitle) columns[titleIdx] = pageTitle;
              if (fileRefIdx !== -1 && fileRef) columns[fileRefIdx] = fileRef;
              found = true;
              return columns.join(',');
            }
            return line;
          });

          if (!found) {
            // Add new row if route not found
            // We need to construct a full row. 
            // route,fileRef,pageTitle,templateId,contentKey,theme,heroVisualId
            const newRow = new Array(headers.length).fill('');
            newRow[routeIdx] = route;
            newRow[templateIdx] = templateId;
            newRow[contentIdx] = contentKey;
            
            // fileRef
            if (fileRefIdx !== -1) {
                if (fileRef) newRow[fileRefIdx] = fileRef;
                else {
                    if (route.startsWith('/expertise')) newRow[fileRefIdx] = 'content/expertise.ts';
                    else if (route.startsWith('/industries')) newRow[fileRefIdx] = 'content/industries.ts';
                    else newRow[fileRefIdx] = 'content/home.ts';
                }
            }
            
            // pageTitle
            if (titleIdx !== -1) {
                if (pageTitle) newRow[titleIdx] = pageTitle;
                else newRow[titleIdx] = route.split('/').pop() || 'Home';
            }

            updatedLines.push(newRow.join(','));
          }
          fs.writeFileSync(CSV_PATH, updatedLines.filter(l => l.trim()).join('\n') + '\n');
        }
      }
    }

    // Update Template Registry if new template uploaded
    if (templateFile) {
        const templateName = templateFile.name.replace('.tsx', '');
        const registryPath = path.join(process.cwd(), 'src', 'templates', 'registry.ts');
        if (fs.existsSync(registryPath)) {
            let content = fs.readFileSync(registryPath, 'utf-8');
            if (!content.includes(templateName)) {
                // Add import
                const importLine = `import ${templateName} from '@/src/templates/${templateName}'\n`;
                content = importLine + content;
                
                // Add to TEMPLATE_BY_ID
                const mapMatch = content.match(/export const TEMPLATE_BY_ID: Record<RegistryTemplateId, TemplateComponent> = \{/);
                if (mapMatch) {
                    const insertIdx = mapMatch.index! + mapMatch[0].length;
                    content = content.slice(0, insertIdx) + `\n  '${templateId}': ${templateName},` + content.slice(insertIdx);
                }
                
                // Add to TemplateComponent union
                content = content.replace(/export type TemplateComponent =/, `export type TemplateComponent =\n  | typeof ${templateName}`);
                
                fs.writeFileSync(registryPath, content);
            }
        }
    }

    // Update Content Registry if new content uploaded
    if (contentFile) {
        const contentName = contentFile.name.replace('.ts', '');
        const registryPath = path.join(process.cwd(), 'src', 'content', 'registry.ts');
        if (fs.existsSync(registryPath)) {
            let content = fs.readFileSync(registryPath, 'utf-8');
            if (!content.includes(contentName)) {
                // Add import
                const importLine = `import { ${contentName.toUpperCase().replace(/-/g, '_')}_CONTENT } from '@/content/${contentName}'\n`;
                // Try to find a good place for import
                const lastImport = content.lastIndexOf('import ');
                const endOfLastImport = content.indexOf('\n', lastImport) + 1;
                content = content.slice(0, endOfLastImport) + importLine + content.slice(endOfLastImport);

                // Add to contentByKey
                const mapMatch = content.match(/const contentByKey: Record<string, unknown> = \{/);
                if (mapMatch) {
                    const insertIdx = mapMatch.index! + mapMatch[0].length;
                    content = content.slice(0, insertIdx) + `\n  '${contentKey}': ${contentName.toUpperCase().replace(/-/g, '_')}_CONTENT,` + content.slice(insertIdx);
                }
                fs.writeFileSync(registryPath, content);
            }
        }
    }

    // Regenerate registry
    try {
      await execAsync('npm run gen:registry');
    } catch (execError: any) {
      console.error('Error running gen:registry:', execError);
      // We still return success but log the error
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin Manager POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
