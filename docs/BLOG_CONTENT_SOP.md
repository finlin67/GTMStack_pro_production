# GTMStack Blog Content SOP

## How to Fill Out ACF Fields (Intern Guide)

---

# 🧠 Overview

Each blog post uses structured fields to control how the page looks.

You are NOT just writing a blog post.

You are **building a layout using content blocks**.

---

# ✅ REQUIRED FIELDS (Always Fill These)

## 1. Layout Type

**Field:** `layout_type`

Use:

```text
modular_article
```

---

## 2. Title (WordPress Title)

Clear, specific, benefit-driven.

---

## 3. Dek (Summary)

**Field:** `dek`

* 1–2 sentences
* Explain what the reader will learn

---

## 4. Sections (Main Content)

**Field:** `sections`

You must include:

* at least **2 text sections**
* at least **1 callout**
* at least **1 checklist**
* at least **1 image section**

---

## 5. CTA (Call-To-Action)

Fill all:

* `cta_headline`
* `cta_body`
* `cta_button_label`
* `cta_button_url`

Default URL:

```text
/contact
```

---

## 6. FAQ Section

Add **3–5 questions**

Each must include:

* question
* answer

---

# ✳️ OPTIONAL (BUT RECOMMENDED)

## Hero Kicker

Short label above title
Example:
`Marketing Tools`

---

## Featured Quote

One strong takeaway

---

## Author Note

1–2 sentence context or explanation

---

# 🧱 CONTENT BLOCKS (SECTIONS)

Each section has a **type**

---

## 1. TEXT SECTION

Use for normal writing.

Fields:

* heading (optional)
* body (required)

✅ Keep body:

* clean
* readable
* no messy HTML

---

## 2. CALLOUT SECTION

Use for:

* key insight
* important takeaway

Fields:

* heading
* body
* style

### Styles:

* `highlight` → most common
* `info`
* `warning`
* `success`

✅ Default:

```text
highlight
```

---

## 3. CHECKLIST SECTION

Use for:

* bullet points
* criteria
* steps

Fields:

* heading
* items (list)

Each item:

```text
{ "text": "..." }
```

✅ Use 3–6 items

---

## 4. IMAGE SECTION

This is the most misunderstood one 👇

Fields:

* image_url
* image_alt
* image_caption
* image_prompt

---

# 🖼 IMAGE RULES (IMPORTANT)

## Rule #1 — If you HAVE an image

Fill:

```text
image_url = real link
```

Example:

```text
https://yourcdn.com/image.png
```

---

## Rule #2 — If you DO NOT have an image

Leave:

```text
image_url = empty
```

AND fill:

```text
image_prompt
```

---

## Rule #3 — What is image_prompt?

It is a **description of what image should be created later**

Example:

```text
A clean side-by-side comparison diagram of Webflow vs WordPress showing ease of use, SEO, flexibility, and scalability
```

---

## Rule #4 — Always fill image_alt

Describe the image.

Good:

```text
Comparison diagram of Webflow and WordPress features
```

Bad:

```text
image
graphic
```

---

## Rule #5 — image_caption

Optional but helpful.

Explains why the image matters.

---

## 🔁 Summary

| Situation               | What to do          |
| ----------------------- | ------------------- |
| You have an image       | Fill `image_url`    |
| You don’t have an image | Fill `image_prompt` |
| Always                  | Fill `image_alt`    |

---

# ❓ FAQ RULES

* Use 3–5 FAQs
* Keep answers short and helpful
* Focus on real questions users would ask

---

# ⚠️ COMMON MISTAKES (Avoid These)

❌ Writing `ACF_DEK:` inside content
❌ Leaving placeholder text
❌ Filling image fields on non-image sections
❌ Using long paragraphs in callouts
❌ Adding HTML inside checklist items
❌ Leaving FAQ empty
❌ Using vague titles like “Overview”
❌ Writing without clear structure

---

# ✅ SIMPLE POST TEMPLATE (Use This Every Time)

1. Hero Kicker
2. Dek
3. Featured Quote
4. Text section
5. Callout section
6. Checklist section
7. Text section
8. Image section
9. FAQ (3 items)
10. CTA

---

# 🧠 Final Rule

If you're unsure:

👉 Keep it simple
👉 Keep it structured
👉 Make it useful

---
