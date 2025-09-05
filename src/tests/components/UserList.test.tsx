import { render, screen } from "@testing-library/react";
import UserList from "../../components/UserList";
import { User } from "../../entities";

describe("Testing UserList Component", () => {
  it('should display "no users" when there no users to display', () => {
    const users: User[] = [];
    render(<UserList users={users} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should display user in links when there are users", () => {
    const users: User[] = [
      {
        id: 1,
        name: "mark",
      },
      {
        id: 2,
        name: "robin",
      },
    ];
    render(<UserList users={users} />);
    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
