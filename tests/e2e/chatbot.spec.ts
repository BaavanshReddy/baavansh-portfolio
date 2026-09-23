import { expect, test } from "@playwright/test";

// With no ANTHROPIC_API_KEY on the test server, the chat runs its offline
// retrieval engine: this checks the answers a visitor actually sees.
async function ask(page: import("@playwright/test").Page, q: string) {
  const input = page.getByRole("textbox", { name: "Ask a question" });
  await input.fill(q);
  await input.press("Enter");
  const log = page.getByRole("log", { name: "Conversation" });
  await expect(log.getByText(q, { exact: true })).toBeVisible();
  return log;
}

test.describe("chat assistant (offline mode)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#chat");
    await expect(page.getByText("Offline retrieval")).toBeVisible();
  });

  test("describes itself accurately", async ({ page }) => {
    await expect(page.locator("#chat")).toContainText(
      "not a model trained on me",
    );
    const log = await ask(page, "Was this chatbot trained on you?");
    await expect(log).toContainText("not a trained or fine-tuned model");
  });

  test("answers GPU questions honestly", async ({ page }) => {
    const log = await ask(page, "Have you trained models on GPUs?");
    await expect(log).toContainText("I have not trained on GPUs");
  });

  test("separates project work from employer work", async ({ page }) => {
    const log = await ask(
      page,
      "Do you have 5 years of production ML experience?",
    );
    await expect(log).toContainText("not five or more years");
  });

  test("starter chip for ML systems works", async ({ page }) => {
    await page
      .getByRole("button", { name: "What ML systems have you built?" })
      .click();
    await expect(page.getByRole("log", { name: "Conversation" })).toContainText(
      "MLOps Deployment Lab",
    );
  });
});
