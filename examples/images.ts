// The package's example images: the install banner from bannerMarkup over a phone-sized page, once for each kind of
// browser it handles. Rendered by classes/render_images.py in headless Chrome.
import { bannerMarkup } from "../implementation/web/install-banner.ts";
import type { BannerKind } from "../implementation/web/install-banner.ts";

type Scene = { name: string; caption: string; width: number; height: number; look?: string; render: (root: HTMLElement) => void };

function phone(kind: Exclude<BannerKind, "none">) {
  return (root: HTMLElement) => {
    const page = document.createElement("div");
    Object.assign(page.style, { padding: "28px 20px", display: "flex", flexDirection: "column", gap: "14px" });
    const title = document.createElement("div");
    title.textContent = "Garden Planner";
    Object.assign(title.style, { fontSize: "26px", fontWeight: "700" });
    page.append(title);
    for (const text of ["Tomatoes · water today", "Beans · sow this week", "Basil · ready to pick"]) {
      const row = document.createElement("div");
      row.textContent = text;
      Object.assign(row.style, { padding: "16px", borderRadius: "14px", background: "var(--surface)", border: "1px solid var(--edge)" });
      page.append(row);
    }
    const host = document.createElement("div");
    host.attachShadow({ mode: "open" }).innerHTML = bannerMarkup(kind, "Garden Planner");
    root.append(page, host);
  };
}

export const scenes: Scene[] = [
  { name: "install-prompt", caption: "The banner where the browser offers installation: one tap on Add", width: 390, height: 844, render: phone("install") },
  { name: "safari", caption: "The banner in Safari on iPhone, with the steps through Share", width: 390, height: 844, render: phone("safari") },
  { name: "android", caption: "The banner in an Android browser without an install prompt", width: 390, height: 844, render: phone("android") },
  { name: "in-app-browser", caption: "The banner in an app's built-in browser, which cannot install: open in Safari first", width: 390, height: 844, render: phone("in-app") },
];
