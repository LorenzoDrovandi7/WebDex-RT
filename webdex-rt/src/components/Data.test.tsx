import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { Mock } from "vitest";
import Data from "./Data";

vi.mock("../hooks/usePokemon", () => ({
  usePokemon: vi.fn(),
}));

import { usePokemon } from "../hooks/usePokemon";

test("displays the Pokémon information when it exists", () => {
  const mockedUsePokemon = usePokemon as unknown as Mock;

  mockedUsePokemon.mockReturnValue({
    pokemon: {
      id: 25,
      name: "Pikachu",
      abilities: ["static"],
      eggGroups: ["field"],
      moves: ["thunder-shock", "quick-attack"],
      weight: 60,
      height: 4,
      captureRate: 190,
      growthRate: "medium-fast",
      generation: "generation-i",
      evolutions: [{ name: "Raichu", image: "https://raw.githubusercontent.com/.../raichu.png" }],
    },
  });

  render(<Data nameOrId="pikachu" />);

  expect(screen.getByText("static")).toBeInTheDocument();
  expect(screen.getByText("field")).toBeInTheDocument();
  expect(screen.getByText("60")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("190")).toBeInTheDocument();
  expect(screen.getByText("medium-fast")).toBeInTheDocument();
  expect(screen.getByText("generation-i")).toBeInTheDocument();
  expect(screen.getByText("thunder-shock")).toBeInTheDocument();
  expect(screen.getByText("quick-attack")).toBeInTheDocument();
  expect(screen.getByAltText("Raichu")).toBeInTheDocument();
  expect(screen.getByText("Raichu")).toBeInTheDocument();
});

test("displays default values when there is no Pokémon", () => {
  const mockedUsePokemon = usePokemon as unknown as Mock;

  mockedUsePokemon.mockReturnValue({ pokemon: null });

  render(<Data nameOrId="missingno" />);

  expect(screen.getByTestId("abilities-text")).toHaveTextContent("...");
});
