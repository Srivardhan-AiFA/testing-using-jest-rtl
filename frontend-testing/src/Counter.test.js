import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("Counter initial value", () => {
  render(<Counter />);
  const count = Number(screen.getByTestId("counter").textContent);
  expect(count).toBe(0); // .toBe is preferred for primitives
});
