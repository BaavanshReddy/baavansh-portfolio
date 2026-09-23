import { expect, test } from "@playwright/test";

const PAGES = [
  {
    slug: "mlops-deployment-lab",
    title: "MLOps Deployment Lab",
    metric: "1.95x",
  },
  {
    slug: "responsible-ai-evaluation",
    title: "Responsible AI Evaluation System",
    metric: "0.167 to 0.301",
  },
  {
    slug: "neural-network-training-benchmark",
    title: "Neural Network Training Benchmark",
    metric: "bitwise identical",
  },
];
const HEADINGS = [
  "Problem",
  "Intended use",
  "Architecture",
  "Dataset and limitations",
  "Data contracts",
  "Training and reproducibility",
  "Model registry and versioning",
  "Online and offline inference",
  "Testing and CI/CD",
  "Docker and Kubernetes",
  "Monitoring",
  "Drift detection",
  "Rollback",
  "Responsible-AI findings",
  "Performance measurements",
  "Technical tradeoffs",
  "Failure modes",
  "Repository and setup",
];

for (const p of PAGES) {
  test.describe(`case study: ${p.slug}`, () => {
    test("renders every required section, metrics, and the scope note", async ({
      page,
    }) => {
      await page.goto(`/projects/${p.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.title);
      for (const h of HEADINGS) {
        await expect(
          page.getByRole("heading", { level: 2, name: h, exact: true }),
        ).toBeAttached();
      }
      await expect(page.getByRole("note")).toContainText("no GPU");
      await expect(page.getByRole("note")).toContainText(
        "Not deployed to production",
      );
      await expect(page.locator("#metrics-heading + dl")).toContainText(
        p.metric,
      );
    });

    test("has title, description, Open Graph, canonical, and valid JSON-LD", async ({
      page,
    }) => {
      await page.goto(`/projects/${p.slug}`);
      await expect(page).toHaveTitle(
        `${p.title}: case study | Baavansh Reddy Gundlapalli`,
      );
      const desc = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(desc && desc.length).toBeGreaterThan(80);
      expect(
        await page.locator('meta[property="og:title"]').getAttribute("content"),
      ).toContain(p.title);
      expect(
        await page.locator('meta[property="og:image"]').getAttribute("content"),
      ).toContain("/og.png");
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
      ).toBe(`https://baavansh-portfolio.vercel.app/projects/${p.slug}`);
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const types = blocks.flatMap((b) => {
        const v = JSON.parse(b);
        return (Array.isArray(v) ? v : [v]).map(
          (x: { "@type": string }) => x["@type"],
        );
      });
      expect(types).toEqual(
        expect.arrayContaining(["TechArticle", "BreadcrumbList", "Person"]),
      );
    });

    test("screenshots load with alt text", async ({ page }) => {
      await page.goto(`/projects/${p.slug}`);
      const imgs = page.locator("#screenshots img");
      const n = await imgs.count();
      expect(n).toBeGreaterThanOrEqual(3);
      for (let i = 0; i < n; i++) {
        const img = imgs.nth(i);
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (el: HTMLImageElement) => el.complete && el.naturalWidth,
            ),
          )
          .toBeGreaterThan(0);
        expect((await img.getAttribute("alt"))?.length).toBeGreaterThan(30);
      }
    });

    test("table of contents links jump to sections", async ({ page }) => {
      await page.goto(`/projects/${p.slug}`);
      await page
        .getByRole("navigation", { name: "On this page" })
        .getByRole("link", { name: "Rollback" })
        .click();
      await expect(page).toHaveURL(/#rollback$/);
      await expect(page.locator("#rollback")).toBeInViewport();
    });
  });
}

test("case-study index lists all three", async ({ page }) => {
  await page.goto("/projects");
  await expect(page).toHaveTitle(
    "ML systems case studies | Baavansh Reddy Gundlapalli",
  );
  for (const p of PAGES)
    await expect(
      page.getByRole("link", { name: new RegExp(p.title) }),
    ).toBeVisible();
});

test("unknown case study returns 404", async ({ request }) => {
  const res = await request.get("/projects/not-a-project");
  expect(res.status()).toBe(404);
});

test("sitemap and robots list the new pages", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const p of PAGES) expect(sitemap).toContain(`/projects/${p.slug}`);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(
    "Sitemap: https://baavansh-portfolio.vercel.app/sitemap.xml",
  );
});
