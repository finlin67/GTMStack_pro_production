// app/api/admin/publish-case-study/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminAuthorized, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { CaseStudyItemSchema } from "@/src/lib/content-schemas/CaseStudyItem";
import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";
import path from "path";
import fs from "fs";

export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminAuthorized(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { item, mode = "append" } = body;

  const validated = CaseStudyItemSchema.safeParse(item);
  if (!validated.success) {
    return NextResponse.json({ error: "Invalid CaseStudyItem", issues: validated.error.issues }, { status: 400 });
  }

  const newItem = validated.data;
  const filePath = path.join(process.cwd(), "content", "case-studies.ts");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 500 });
  }

  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);

    const caseStudyItemsVar = sourceFile.getVariableDeclaration("caseStudyItems");
    if (!caseStudyItemsVar) {
      return NextResponse.json({ error: "caseStudyItems array not found in case-studies.ts" }, { status: 500 });
    }

    const initializer = caseStudyItemsVar.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (!initializer) {
      return NextResponse.json({ error: "caseStudyItems is not an array literal" }, { status: 500 });
    }

    // Check for duplicate slug
    const existingItems = initializer.getElements();
    let existingItemIndex = -1;

    for (let i = 0; i < existingItems.length; i++) {
      const element = existingItems[i];
      if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
        const obj = element as ObjectLiteralExpression;
        const slugProp = obj.getProperty("slug");
        if (slugProp && slugProp.getKind() === SyntaxKind.PropertyAssignment) {
          const assignment = slugProp.asKindOrThrow(SyntaxKind.PropertyAssignment);
          const propInitializer = assignment.getInitializer();
          if (propInitializer && propInitializer.getKind() === SyntaxKind.StringLiteral) {
            const slugValue = propInitializer.asKindOrThrow(SyntaxKind.StringLiteral).getLiteralValue();
            if (slugValue === newItem.slug) {
              if (mode === "append") {
                return NextResponse.json({ error: `Duplicate slug: ${newItem.slug}` }, { status: 409 });
              }
              existingItemIndex = i;
              break;
            }
          }
        }
      }
    }

    let action = "appended";
    if (existingItemIndex !== -1) {
      // Replace existing item
      initializer.removeElement(existingItemIndex);
      initializer.insertElement(existingItemIndex, JSON.stringify(newItem, null, 2));
      action = "updated";
    } else {
      // Append the new item
      initializer.addElement(JSON.stringify(newItem, null, 2));
    }
    
    await sourceFile.save();

    return NextResponse.json({ success: true, slug: newItem.slug, action });
  } catch (err: any) {
    console.error("Failed to update case-studies.ts:", err);
    return NextResponse.json({ error: `Internal error: ${err.message}` }, { status: 500 });
  }
}
