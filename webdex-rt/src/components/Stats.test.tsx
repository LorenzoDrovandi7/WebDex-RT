import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import type { Mock } from "vitest";
import Stats from "./Stats";

vi.mock("../hooks/usePokemon", () => ({
  usePokemon: vi.fn(),
}));

import { usePokemon } from "../hooks/usePokemon";

describe("Stats component", () => {
  const mockedUsePokemon = usePokemon as unknown as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("displays the Pokémon’s stat values correctly", () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: {
        stats: [
          { name: "hp", value: 45 },
          { name: "attack", value: 49 },
          { name: "defense", value: 65 },
          { name: "special-attack", value: 60 },
          { name: "special-defense", value: 55 },
          { name: "speed", value: 44 },
        ],
      },
    });

    render(<Stats nameOrId="bulbasaur" />);

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("ATT")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
    expect(screen.getByText("S.ATT")).toBeInTheDocument();
    expect(screen.getByText("S.DEF")).toBeInTheDocument();
    expect(screen.getByText("SPED")).toBeInTheDocument();

    expect(screen.getByText("45")).toBeInTheDocument();
    expect(screen.getByText("49")).toBeInTheDocument();
    expect(screen.getByText("65")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("55")).toBeInTheDocument();
    expect(screen.getByText("44")).toBeInTheDocument();
  });

  test("displays 0 when the Pokémon has no stats", () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: undefined,
    });

    render(<Stats nameOrId="missingno" />);

    expect(screen.getAllByText("0")).toHaveLength(6);
  });

  test("displays 0 if a specific stat is missing", () => {
    mockedUsePokemon.mockReturnValue({
      pokemon: {
        stats: [
          { name: "hp", value: 99 },
        ],
      },
    });

    render(<Stats nameOrId="glitchmon" />);

    expect(screen.getByText("99")).toBeInTheDocument();
    expect(screen.getAllByText("0")).toHaveLength(5);
  });
});
