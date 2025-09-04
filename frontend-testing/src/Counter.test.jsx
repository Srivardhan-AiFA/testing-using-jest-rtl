import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Counter from "./Counter.jsx";

describe("testing", () => {
    it("Counter initial value", () => {
      render(<Counter />);
      const count = Number(screen.getByTestId("counter").textContent);
      expect(count).toBe(0);
    });

    it("Counter increment", () => {
      render(<Counter />);
      const button = screen.getByText("Increment");
      fireEvent.click(button);
      const count = Number(screen.getByTestId("counter").textContent);
      expect(count).toBe(1);
    })
    it("Counter decrement", () => {
      render(<Counter />);
      const button = screen.getByText("Decrement");
      fireEvent.click(button);
      const count = Number(screen.getByTestId("counter").textContent);
      expect(count).toBe(-1);
    })
    it("Counter set to zero", () => {
      render(<Counter />);
      const incButton = screen.getByText("Increment");
      fireEvent.click(incButton);
      fireEvent.click(incButton);
      const button = screen.getByText("Set to ZERO");
      fireEvent.click(button);
      const count = Number(screen.getByTestId("counter").textContent);
      expect(count).toBe(0);
    })
    it("Counter reverse sign", () => {
      render(<Counter />);
      const incButton = screen.getByText("Increment");
      fireEvent.click(incButton);
      fireEvent.click(incButton);
      const button = screen.getByText("Reverse Sign");
      fireEvent.click(button);
      const count = Number(screen.getByTestId("counter").textContent);
      expect(count).toBe(-2);
    })
})