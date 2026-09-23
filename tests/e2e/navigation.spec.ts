import { expect, test } from "@playwright/test";

test.describe("home page navigation", () => {
  test("new ML sections render between the existing ones", async ({ page }) => {
    await page.goto("/");
    const ids = await page.$$eval("main > section", (els) =>
      els.map((e) => e.id),
    );
    expect(ids).toEqual([
      "top",
      "ml-summary",
      "about",
      "ml-systems",
      "work",
      "chat",
      "experience",
      "skills",
      "education",
      "leadership",
      "contact",
    ]);
    await expect(
      page.getByRole("heading", { name: "ML systems, end to end" }),
    ).toBeVisible();
    for (const t of [
      "MLOps Deployment Lab",
      "Responsible AI Evaluation System",
      "Neural Network Training Benchmark",
      "LLM FactCheck",
      "AgentMemry",
    ]) {
      await expect(
        page.locator("#ml-systems").getByRole("heading", { name: t }),
      ).toBeVisible();
    }
  });

  test("existing projects and content are preserved", async ({ page }) => {
    await page.goto("/");
    for (const t of [
      "AgentMemry: Open-Source Memory for AI Agents",
      "Chat-with-Baavansh Portfolio",
      "TinyL Compiler",
      "Neural Network from Scratch",
      "RISC-V CPU Simulator",
      "Unix-Style Filesystem",
      "RuPizza: OOP Ordering App",
      "Campus Event Scraper",
    ]) {
      await expect(
        page.locator("#work").getByText(t, { exact: false }).first(),
      ).toBeAttached();
    }
    await expect(page.locator("#experience")).toContainText(
      "TAIRC (The AI Research Center)",
    );
    await expect(page.locator("#experience")).toContainText("RNR Facilities");
    await expect(page.locator("#leadership")).toContainText(
      "Rutgers University Police Department",
    );
    await expect(page.locator("#contact")).toContainText(
      "baavanshreddy@gmail.com",
    );
  });

  test("case-study link opens the case study, and the nav leads back home", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    await page
      .locator("#ml-systems")
      .getByRole("link", { name: /Read case study.*MLOps Deployment Lab/ })
      .click();
    await expect(page).toHaveURL(/\/projects\/mlops-deployment-lab$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "MLOps Deployment Lab",
    );
    if (isMobile) {
      await page.getByRole("button", { name: "Toggle menu" }).click();
      await page
        .getByRole("navigation", { name: "Mobile" })
        .getByRole("link", { name: "Ask AI" })
        .click();
    } else {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "Ask AI" })
        .click();
    }
    await expect(page).toHaveURL(/\/#chat$/);
    await expect(page.locator("#chat")).toBeInViewport();
  });

  test("in-page nav reaches the ML Systems section", async ({
    page,
    isMobile,
  }) => {
    await page.goto("/");
    if (isMobile) {
      await page.getByRole("button", { name: "Toggle menu" }).click();
      await page
        .getByRole("navigation", { name: "Mobile" })
        .getByRole("link", { name: "ML Systems" })
        .click();
    } else {
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "ML Systems" })
        .click();
    }
    await expect(page.locator("#ml-systems")).toBeInViewport();
  });

  test("keyboard: skip link works and focus is visible", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "keyboard navigation checked on desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    const outline = await skip.evaluate(
      (el) => getComputedStyle(el).outlineStyle,
    );
    expect(outline).not.toBe("none");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
    // Tab through the first stops; each must show a visible focus style.
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press("Tab");
      const style = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return el ? getComputedStyle(el).outlineStyle : "none";
      });
      expect(style).not.toBe("none");
    }
  });

  test("reduced motion: hero content is visible (regression)", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/");
    await page.waitForTimeout(1500);
    const opacity = await page
      .locator("h1 span")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBe(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Baavansh Reddy",
    );
    await ctx.close();
  });
});
