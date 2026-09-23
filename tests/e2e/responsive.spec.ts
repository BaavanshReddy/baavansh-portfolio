import { expect, test } from "@playwright/test";

const WIDTHS = [360, 390, 768, 1024, 1280, 1440];
const PATHS = [
  "/",
  "/projects",
  "/projects/mlops-deployment-lab",
  "/projects/responsible-ai-evaluation",
  "/projects/neural-network-training-benchmark",
];

test.describe("responsive layout", () => {
  test.skip(({ isMobile }) => isMobile, "widths are set explicitly");
  for (const width of WIDTHS) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of PATHS) {
        await page.goto(path);
        const { scroll, inner } = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          inner: window.innerWidth,
        }));
        expect(scroll, `${path} at ${width}px`).toBeLessThanOrEqual(inner);
      }
    });
  }

  test("desktop nav fits at the md breakpoint, mobile menu below it", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    const box = await nav.boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(768);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(nav).toBeHidden();
    await page.getByRole("button", { name: "Toggle menu" }).click();
    await expect(
      page
        .getByRole("navigation", { name: "Mobile" })
        .getByRole("link", { name: "ML Systems" }),
    ).toBeVisible();
  });
});
