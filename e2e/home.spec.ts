import { test, expect } from "@playwright/test";

test("renders home page", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Home" }),
  ).toBeVisible();
  await expect(page.getByText("seeded@example.com")).toBeVisible();
});
