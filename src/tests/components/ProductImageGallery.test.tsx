import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../components/ProductImageGallery";

describe("Testing ProductImageGallery Component", () => {
  it("should display nothing if there are no Images", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render all images when image URLs are provided", () => {
    const imagesUrls: string[] = ["image1", "image2", "image3"];
    render(<ProductImageGallery imageUrls={imagesUrls} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(imagesUrls.length);
    imagesUrls.forEach((imgUrl, index) => {
      expect(images[index]).toHaveAttribute("src", `${imgUrl}`);
    });
  });
});
