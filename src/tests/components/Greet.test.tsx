import { render, screen } from '@testing-library/react'
import Greet from "../../components/Greet";

describe("Greet", () => {
  it("should greet the user with the provided name", () => {
    render(<Greet name="srivardhan" />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/srivardhan/i);
  });

  it("should render login button when name not provided", () => {
    render(<Greet />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
