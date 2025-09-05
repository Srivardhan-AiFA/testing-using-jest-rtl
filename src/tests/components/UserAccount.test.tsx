import { render, screen } from "@testing-library/react";
import UserAccount from "../../components/UserAccount";

describe("UserAccount Component", () => {
  it("shows the edit button when user is admin", () => {
    const user = {
      id: 1,
      name: "user",
      isAdmin: true,
    };
    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should show the user name if the user is not an admin", () => {
    const user = {
      id: 1,
      name: "user",
    };
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toHaveTextContent(user.name);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
