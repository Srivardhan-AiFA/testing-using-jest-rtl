import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("Terms And Conditions", () => {
  it("should render correct text and initial state", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should enable the button when the checkbox is clicked", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkbox);

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });

  it("should disable the button when the checkbox is clicked again", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(checkbox);
    expect(button).toBeEnabled();

    await user.click(checkbox);
    expect(button).toBeDisabled();
  });
});
