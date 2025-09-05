import { render, screen } from "@testing-library/react";
import ExpandableText from "../../components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText Test", () => {
  it("should display the text with and no button should be displayed", () => {
    const text: string = "Testing the component";

    render(<ExpandableText text={text} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("should display the button with see more and see less when the text length exceeds the limit", async () => {
    const text: string =
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis laudantium obcaecati cupiditate quasi atque nam, dolorum illo molestiae nihil cum esse, laboriosam enim molestias perferendis voluptates sapiente, assumenda recusandae. Velit aperiam esse, voluptatum alias unde necessitatibus temporibus aspernatur corporis! Saepe quia laborum deleniti ducimus, in, ipsum nesciunt ipsam iure esse consequatur voluptates ab placeat velit quidem dolorem. Illum quod veritatis eum magnam maiores totam, fuga, eveniet natus optio corrupti nemo!";

    render(<ExpandableText text={text} />);

    const article = screen.getByRole("article");
    expect(article).toHaveTextContent(text.substring(0, 255) + "...");
    expect(article).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);

    const event = userEvent.setup();
    await event.click(button);
    expect(article).toHaveTextContent(text);
    expect(button).toHaveTextContent(/less/i);
  });
});
