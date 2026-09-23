import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

// SHA-256 of the final audited resume (Baavansh_Gundlapalli_Resume.pdf, Sep 2026).
const RESUME_SHA256 =
  "62db04d1ebaa6b4598c908553afd53b54320ea4738fdd9abdfc42356c7f3dd66";

const REQUIRED_LINKS = [
  "https://github.com/BaavanshReddy",
  "https://www.linkedin.com/in/baavansh-reddy-gundlapalli",
  "https://pypi.org/project/agentmemry/",
  "mailto:baavanshreddy@gmail.com",
  "https://github.com/BaavanshReddy/agentmemry",
  "https://github.com/BaavanshReddy/baavansh-portfolio",
  "https://github.com/BaavanshReddy/tinyl-compiler",
  "https://github.com/BaavanshReddy/neural-net-from-scratch",
  "https://github.com/BaavanshReddy/risc-v-simulator",
  "https://github.com/BaavanshReddy/linux-filesystem",
  "https://github.com/BaavanshReddy/RUPizza",
  "https://github.com/BaavanshReddy/campus-event-scraper",
  "https://github.com/BaavanshReddy/LLM_factcheck",
  "https://github.com/BaavanshReddy/mlops-deployment-lab",
];

test("all existing contact, profile, and project links are still present", async ({
  page,
}) => {
  await page.goto("/");
  const hrefs = await page.$$eval("a[href]", (as) =>
    as.map((a) => (a as HTMLAnchorElement).getAttribute("href")),
  );
  for (const l of REQUIRED_LINKS) expect(hrefs, l).toContain(l);
});

for (const path of [
  "/",
  "/projects/mlops-deployment-lab",
  "/projects/responsible-ai-evaluation",
  "/projects/neural-network-training-benchmark",
]) {
  test(`external links on ${path} are well-formed and open safely`, async ({
    page,
  }) => {
    await page.goto(path);
    const links = await page.$$eval("a[href^='http']", (as) =>
      as.map((a) => ({
        href: a.getAttribute("href")!,
        target: a.getAttribute("target"),
        rel: a.getAttribute("rel"),
      })),
    );
    expect(links.length).toBeGreaterThan(3);
    for (const l of links) {
      expect(() => new URL(l.href)).not.toThrow();
      expect(l.href.startsWith("https://"), l.href).toBe(true);
      expect(l.href).not.toContain("[[");
      expect(l.target, l.href).toBe("_blank");
      expect(l.rel ?? "", l.href).toContain("noreferrer");
    }
  });
}

test("résumé download serves the final audited résumé", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const hrefs = await page.$$eval("a", (as) =>
    as
      .filter((a) => /r.sum/i.test(a.textContent ?? ""))
      .map((a) => a.getAttribute("href")),
  );
  expect(hrefs.length).toBeGreaterThanOrEqual(3);
  for (const h of hrefs) expect(h).toBe("/resume.pdf");
  const res = await request.get("/resume.pdf");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("application/pdf");
  const body = await res.body();
  expect(body.subarray(0, 4).toString()).toBe("%PDF");
  expect(createHash("sha256").update(body).digest("hex")).toBe(RESUME_SHA256);
});
