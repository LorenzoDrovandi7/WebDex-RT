import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import type { Mock } from "vitest";
import { usePokemon } from "./usePokemon";
import { loadPokemon } from "../services/loadPokemon";

vi.mock("../services/loadPokemon", () => ({
  loadPokemon: vi.fn(),
}));

describe("usePokemon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Returns the Pokémon when loadPokemon resolves successfully.", async () => {
    const mockPokemon = { id: 25, name: "Pikachu" };
    (loadPokemon as Mock).mockResolvedValueOnce(mockPokemon);

    const { result } = renderHook(() => usePokemon("pikachu"));

    expect(result.current.loading).toBe(true);
    expect(result.current.pokemon).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(loadPokemon).toHaveBeenCalledWith("pikachu");
    expect(result.current.pokemon).toEqual(mockPokemon);
    expect(result.current.error).toBeNull();
  });

  test("It returns an error when loadPokemon throws an exception with a message.", async () => {
    (loadPokemon as Mock).mockRejectedValueOnce(new Error("Fallo en fetch"));

    const { result } = renderHook(() => usePokemon("charizard"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(loadPokemon).toHaveBeenCalledWith("charizard");
    expect(result.current.pokemon).toBeNull();
    expect(result.current.error).toBe("Fallo en fetch");
  });

  test("Use 'Unknown error' when the error has no message.", async () => {
    (loadPokemon as Mock).mockRejectedValueOnce({});

    const { result } = renderHook(() => usePokemon("mewtwo"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(loadPokemon).toHaveBeenCalledWith("mewtwo");
    expect(result.current.pokemon).toBeNull();
    expect(result.current.error).toBe("Unknown error");
  });

  test("It does not call loadPokemon if nameOrId is empty.", async () => {
    const { result } = renderHook(() => usePokemon(""));

    expect(loadPokemon).not.toHaveBeenCalled();
    expect(result.current.pokemon).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });
});
