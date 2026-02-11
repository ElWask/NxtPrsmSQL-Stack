import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeView from "../app/home-view";

test("HomeView", () => {
  render(<HomeView email="frontend@example.com" />);
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
  expect(screen.getByTestId("user-email").textContent).toBe(
    "frontend@example.com",
  );
});
