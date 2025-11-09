import { describe, test, expect, vi, beforeEach } from "vitest";
import { loadPokemon } from "./loadPokemon";
import { fetchData } from "./pokeApi";
import { mapPokemon } from "../mappers/pokemonMapper";

vi.mock("./pokeApi", () => ({
  fetchData: vi.fn(),
}));

vi.mock("../mappers/pokemonMapper", () => ({
  mapPokemon: vi.fn(),
}));

describe("loadPokemon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("correctly loads and maps the Pokémon", async () => {
    const mockRawPokemon = { id: 25, name: "pikachu" };
    const mockRawSpecies = {
      evolution_chain: { url: "https://pokeapi.co/api/v2/evolution-chain/10/" },
    };
    const mockRawEvo = { chain: {} };
    const mockMapped = { id: 25, name: "Pikachu", type: "electric" };

    (fetchData as any)
      .mockResolvedValueOnce(mockRawPokemon)
      .mockResolvedValueOnce(mockRawSpecies)
      .mockResolvedValueOnce(mockRawEvo);

    (mapPokemon as any).mockReturnValue(mockMapped);

    const result = await loadPokemon("pikachu");

    expect(fetchData).toHaveBeenNthCalledWith(
      1,
      "https://pokeapi.co/api/v2/pokemon/pikachu"
    );
    expect(fetchData).toHaveBeenNthCalledWith(
      2,
      "https://pokeapi.co/api/v2/pokemon-species/pikachu"
    );
    expect(fetchData).toHaveBeenNthCalledWith(
      3,
      "https://pokeapi.co/api/v2/evolution-chain/10/"
    );

    expect(mapPokemon).toHaveBeenCalledWith(
      mockRawPokemon,
      mockRawSpecies,
      mockRawEvo
    );

    expect(result).toEqual(mockMapped);
  });

  test("It throws an error if fetchData fails.", async () => {
    (fetchData as any).mockRejectedValueOnce(new Error("Error de red"));

    await expect(loadPokemon("mewtwo")).rejects.toThrow("Error de red");
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(mapPokemon).not.toHaveBeenCalled();
  });
});
