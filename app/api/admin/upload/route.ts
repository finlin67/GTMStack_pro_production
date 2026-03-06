import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic'

const MAX_UPLOAD_BYTES = 512 * 1024; // 512KB (adjust as needed)
const UPLOADS_ENABLED =
    process.env.NODE_ENV === 'development' &&
    process.env.ALLOW_TEMPLATE_UPLOADS === 'true';

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function assertUploadsAllowed(request: NextRequest) {
  if (!UPLOADS_ENABLED) {
    return jsonError('Template uploads are disabled on this environment.', 403);
  }

  // Basic same-origin / local-only checks (defense-in-depth)
  const host = request.headers.get('host') ?? '';
  const forwardedHost = request.headers.get('x-forwarded-host') ?? '';
  const effectiveHost = (forwardedHost || host).toLowerCase();

  const hostOk =
      effectiveHost.startsWith('localhost:') ||
      effectiveHost.startsWith('127.0.0.1:') ||
      effectiveHost.startsWith('[::1]:') ||
      effectiveHost === 'localhost' ||
      effectiveHost === '127.0.0.1' ||
      effectiveHost === '[::1]';

  if (!hostOk) {
    return jsonError('Template uploads are only allowed from localhost.', 403);
  }

  const origin = request.headers.get('origin');
  if (origin) {
    const originOk =
        origin === 'http://localhost:3000' ||
        origin === 'http://127.0.0.1:3000' ||
        origin === 'http://[::1]:3000';

    if (!originOk) {
      return jsonError('Invalid request origin.', 403);
    }
  }

  return null;
}

function sanitizeTemplateName(input: string) {
  const trimmed = input.trim();

  // Disallow any path separators and traversal attempts
  if (
      trimmed.includes('/') ||
      trimmed.includes('\\') ||
      trimmed.includes('..') ||
      trimmed.startsWith('.')
  ) {
    return null;
  }

  // Normalize: allow letters/numbers/dash/underscore/dot only
  const safe = trimmed.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();

  // Ensure ends with .tsx
  const fileName = safe.endsWith('.tsx') ? safe : `${safe}.tsx`;

  // Basic sanity: must look like "name.tsx"
  if (!/^[a-z0-9][a-z0-9._-]*\.tsx$/.test(fileName)) {
    return null;
  }

  return fileName;
}

export async function POST(request: NextRequest) {
  try {
    const gateError = assertUploadsAllowed(request);
    if (gateError) return gateError;

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const templateName = formData.get('templateName') as string | null;

    if (!file || !templateName) {
      return jsonError('Missing file or templateName', 400);
    }

    if (!file.name.toLowerCase().endsWith('.tsx')) {
      return jsonError('Only .tsx files are allowed.', 400);
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return jsonError(`File too large. Max is ${MAX_UPLOAD_BYTES} bytes.`, 413);
    }

    const fileName = sanitizeTemplateName(templateName);
    if (!fileName) {
      return jsonError('Invalid templateName. Use a simple name like "my-template".', 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write only into src/templates (existing behavior), but:
    // - ensure basename (no paths)
    // - prevent overwrite (wx)
    const filePath = path.join(process.cwd(), 'src', 'templates', path.basename(fileName));

    await writeFile(filePath, buffer, { flag: 'wx' });

    return NextResponse.json({
      success: true,
      message: `File uploaded successfully as ${fileName}`,
    });
  } catch (error: any) {
    // Handle "file exists" nicely
    if (error?.code === 'EEXIST') {
      return NextResponse.json(
          { error: 'A template with that name already exists. Choose a different templateName.' },
          { status: 409 }
      );
    }

    console.error('Error uploading file:', error);
    return NextResponse.json(
        { error: error?.message || 'Failed to upload file' },
        { status: 500 }
    );
  }
}