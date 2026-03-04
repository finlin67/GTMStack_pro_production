// app/api/admin/publish-industry/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertLocalOnly } from "@/src/lib/localOnly";
import { IndustryItemSchema } from "@/src/lib/content-schemas/IndustryItem";
import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    assertLocalOnly();
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 403 });
  }

  const body = await req.json();
  const { item, mode = "append" } = body;

  const validated = IndustryItemSchema.safeParse(item);
  if (!validated.success) {
    return NextResponse.json({ error: "Invalid IndustryItem", issues: validated.error.issues }, { status: 400 });
  }

  const newItem = validated.data;
  const filePath = path.join(process.cwd(), "content", "industries.ts");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 500 });
  }

  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);

    const industryItemsVar = sourceFile.getVariableDeclaration("industryItems");
    if (!industryItemsVar) {
      return NextResponse.json({ error: "industryItems array not found in industries.ts" }, { status: 500 });
    }

    const initializer = industryItemsVar.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (!initializer) {
      return NextResponse.json({ error: "industryItems is not an array literal" }, { status: 500 });
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
    console.error("Failed to update industries.ts:", err);
    return NextResponse.json({ error: `Internal error: ${err.message}` }, { status: 500 });
  }
}
