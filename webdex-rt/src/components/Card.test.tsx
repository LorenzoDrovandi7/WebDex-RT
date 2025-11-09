import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { Mock } from "vitest";
import Card from "./Card";

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
      image: "pikachu.png",
      types: ["electric"],
      about: "An electric mouse.",
    },
  });

  render(<Card nameOrId="pikachu" />);

  expect(screen.getByText("Pikachu")).toBeInTheDocument();
  expect(screen.getByText("#25")).toBeInTheDocument();
  expect(screen.getByText("electric")).toBeInTheDocument();
  expect(screen.getByText("An electric mouse.")).toBeInTheDocument();
});

test("displays default values when there is no Pokémon", () => {
  const mockedUsePokemon = usePokemon as unknown as Mock;

  mockedUsePokemon.mockReturnValue({ pokemon: null });

  render(<Card nameOrId="missingno" />);

  expect(screen.getByTestId("about-text")).toHaveTextContent("...");
  expect(screen.getByText("#0")).toBeInTheDocument();
  expect(screen.getByText("Type")).toBeInTheDocument();
});
