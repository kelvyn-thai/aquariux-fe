import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Header } from "@/components/core/header";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("Should renders correctly content", () => {
    const header = screen.getByTestId("header");

    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe("This is header");
  });
});
