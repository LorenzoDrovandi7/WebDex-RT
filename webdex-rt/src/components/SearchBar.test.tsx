import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the input and search button", () => {
    const mockSelect = vi.fn();

    render(<SearchBar onSelect={mockSelect} />);

    expect(screen.getByPlaceholderText(/name or number/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  test("calls fetch and displays the first Pokémon", async () => {
    const mockSelect = vi.fn();
    const mockResults = {
      results: [
        { name: "bulbasaur", url: "url1" },
        { name: "charmander", url: "url2" },
        { name: "squirtle", url: "url3" },
      ],
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResults),
      })
    ) as unknown as typeof fetch;

    render(<SearchBar onSelect={mockSelect} />);

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    });

    expect(screen.getByText("charmander")).toBeInTheDocument();
    expect(screen.getByText("squirtle")).toBeInTheDocument();
  });

  test("calls onSelect when a Pokémon button is clicked", async () => {
    const mockSelect = vi.fn();
    const mockResults = {
      results: [{ name: "pikachu", url: "url" }],
    };

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResults),
      })
    ) as unknown as typeof fetch;

    render(<SearchBar onSelect={mockSelect} />);

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("pikachu"));
    expect(mockSelect).toHaveBeenCalledWith("pikachu");
  });

  test("calls onSelect when searching through the input", () => {
    const mockSelect = vi.fn();

    render(<SearchBar onSelect={mockSelect} />);

    const input = screen.getByPlaceholderText(/name or number/i);
    const searchButton = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: "mewtwo" } });
    fireEvent.click(searchButton);

    expect(mockSelect).toHaveBeenCalledWith("mewtwo");
  });
});

test("does not call onSelect if the input is empty", () => {
  const onSelect = vi.fn();
  render(<SearchBar onSelect={onSelect} />);

  const searchButton = screen.getByRole("button", { name: /search/i });
  fireEvent.click(searchButton);

  expect(onSelect).not.toHaveBeenCalled();
});
