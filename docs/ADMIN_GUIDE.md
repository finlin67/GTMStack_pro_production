### Admin UI & Page Index CMS: User Guide

Welcome to the **Page Index CMS**. This tool is designed to help you manage the mapping between URLs (routes) on the website and the templates/content that power them. It ensures that every page listed in the sitemap or found in the system is properly registered and configured.

---

### 1. Understanding the Page Index Table

The main dashboard shows a unified list of all pages found across:
- **The Registry:** Pages already configured for display.
- **The Sitemap:** Pages intended for public discovery.
- **The Filesystem:** Actual code files existing on the server.

#### Columns:
- **Page Title & URL:** The name of the page and its web address (e.g., `/expertise/demand-generation`).
- **Status:** A color-coded badge indicating the health of the page mapping (see Statuses below).
- **Mapping (Template / Content):** Shows which design template and content file are currently assigned to this URL.
- **Actions:** Buttons to "Edit Mapping" or "Add to Registry".

---

### 2. Status Indicators

| Status | Meaning | Action Needed |
| :--- | :--- | :--- |
| **Registered** (Green) | Page is correctly mapped and matches the sitemap. | No action needed. |
| **In Sitemap, Missing Registry** (Yellow) | The page is in the public sitemap but hasn't been configured in the CMS yet. | Click **Add to Registry** to set it up. |
| **In Registry, Missing Sitemap** (Blue) | The page is configured but isn't listed in the `sitemap.csv`. | Check if it should be public. |
| **Broken Mapping** (Red) | The page is missing a Template or Content Key, or has an invalid ID. | Click **Edit Mapping** to fix the configuration. |
| **Filesystem Only** (Gray) | A code file exists for this route, but it isn't registered or in the sitemap. | Usually internal or system pages. |

---

### 3. How to Find and Filter Pages

Use the top bar to narrow down the list:
- **Search:** Type any part of a URL (e.g., "health") or a Page Title to find a specific page.
- **Category Filter:** Filter by "Expertise", "Industries", "Case Studies", etc., to see related groups of pages.
- **Status Filter:** Select "Broken Mapping" or "Missing Registry" to quickly find pages that need attention.
- **Refresh:** Click the **Refresh** button to reload the latest data from the server.

---

### 4. How to Add a New Page to the Registry

If you see a page with the status **"In Sitemap, Missing Registry"**:
1. Locate the page in the list.
2. Click the **Add to Registry** button.
3. In the window that appears:
   - **Page Title:** Enter a friendly title for the page (e.g., "Demand Generation").
   - **Template (Page Layout):** Choose the design layout that fits the page (e.g., "Expertise Topic" or "Industry Detail").
   - **Content Key:** Enter the key for the content file.
     - *Purpose:* Tells the system which specific data object to load (e.g., `expertise:demand-generation`).
     - *Format:* `prefix:slug` (e.g., `expertise:demand-generation` or `industries:healthcare`).
   - **Content File (Ref):** The source file containing the page data (e.g., `content/expertise.ts`).
4. Click **Save Changes**. The system will automatically update the registry and refresh the site.

---

### 5. How to Edit an Existing Mapping

To change the title, design, or content of a live page:
1. Click the **Edit Mapping** button on the row you wish to change.
2. Update the **Page Title**, **Template (Page Layout)**, **Content Key**, or **Content File (Ref)**.
3. Click **Save Changes**.

---

### 6. What Happens After You Save?

When you click **Save Changes**:
1. The **`page-registry.csv`** file is updated on the server.
2. A background process (**Registry Regeneration**) runs automatically.
3. The site's internal mapping is updated to reflect your changes immediately.

If you encounter an error message, ensure the **Content Key** follows the `prefix:slug` format and that you've selected a **Template Type**.
