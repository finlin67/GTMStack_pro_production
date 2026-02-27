# Session Transcript - Implementation of CMS File Upload

## Task Overview
The goal was to implement a local CMS file upload for a Next.js 14 project, including both the backend API route and the frontend wiring.

## Backend Implementation
File: `app/api/admin/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const templateName = formData.get('templateName') as string | null;

    if (!file || !templateName) {
      return NextResponse.json(
        { error: 'Missing file or templateName' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the filename ends with .tsx
    const fileName = templateName.toLowerCase().endsWith('.tsx') 
      ? templateName 
      : `${templateName}.tsx`;

    const filePath = path.join(process.cwd(), 'src', 'templates', fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      message: `File uploaded successfully as ${fileName}` 
    });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
```

## Frontend Implementation
File: `app/admin/page.tsx`
Updated `handleUpdateRegister` function:

```typescript
  const handleUpdateRegister = async () => {
    if (!selectedEntry || !selectedFile || selectedFile.error) return

    const formData = new FormData()
    formData.append('file', selectedFile.file)
    formData.append('templateName', selectedEntry.templateId || selectedEntry.template || '')

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Success! ${data.message || 'File uploaded successfully.'}`)
        setSelectedFile(null)
      } else {
        alert(`Error: ${data.error || 'Failed to upload file.'}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('An unexpected error occurred during the upload.')
    }
  }
```

## Summary of Changes
1. Created `app/api/admin/upload/route.ts` to handle file uploads via POST.
2. The API saves files to `src/templates` with a `.tsx` extension.
3. Updated `app/admin/page.tsx` to use the new API endpoint.
4. Added error handling and success notifications on the frontend.
