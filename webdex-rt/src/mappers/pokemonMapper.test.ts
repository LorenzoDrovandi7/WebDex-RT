import { describe, test, expect } from "vitest";
import { mapPokemon } from "./pokemonMapper";

describe("mapPokemon", () => {
  const rawPokemon = {
    id: 25,
    name: "pikachu",
    sprites: { other: { "official-artwork": { front_default: "img.png" } } },
    types: [{ type: { name: "electric" } }],
    abilities: [{ ability: { name: "static" } }],
    weight: 60,
    height: 4,
    moves: [{ move: { name: "thunder-shock" } }],
    stats: [{ stat: { name: "hp" }, base_stat: 35 }],
  } as any;

  const rawSpecies = {
    flavor_text_entries: [
      { flavor_text: "Electric mouse.", language: { name: "en" } },
      { flavor_text: "Otro texto.", language: { name: "es" } },
    ],
    capture_rate: 190,
    egg_groups: [{ name: "field" }],
    growth_rate: { name: "medium-fast" },
    generation: { name: "generation-i" },
  } as any;

  const rawEvolutions = {
    chain: {
      species: { name: "pichu", url: "https://pokeapi.co/api/v2/pokemon-species/172/" },
      evolves_to: [
        {
          species: { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon-species/25/" },
          evolves_to: [
            {
              species: { name: "raichu", url: "https://pokeapi.co/api/v2/pokemon-species/26/" },
              evolves_to: [],
            },
          ],
        },
      ],
    },
  } as any;

  test("It correctly maps the complete data with evolutions.", () => {
    const result = mapPokemon(rawPokemon, rawSpecies, rawEvolutions);

    expect(result.id).toBe(25);
    expect(result.name).toBe("pikachu");
    expect(result.image).toBe("img.png");
    expect(result.types).toEqual(["electric"]);
    expect(result.about).toBe("Electric mouse.");
    expect(result.abilities).toEqual(["static"]);
    expect(result.weight).toBe(6);
    expect(result.height).toBe(0.4);
    expect(result.captureRate).toBe(190);
    expect(result.eggGroups).toEqual(["field"]);
    expect(result.growthRate).toBe("medium-fast");
    expect(result.generation).toBe("generation-i");
    expect(result.moves).toEqual(["thunder-shock"]);
    expect(result.stats).toEqual([{ name: "hp", value: 35 }]);
    expect(result.evolutions).toEqual([
      {
        name: "pichu",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png",
      },
      {
        name: "pikachu",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
      {
        name: "raichu",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
      },
    ]);
  });

  test("Use an empty string if the image and description are missing in English.", () => {
    const noImage = { ...rawPokemon, sprites: { other: { "official-artwork": {} } } };
    const noEnglish = { ...rawSpecies, flavor_text_entries: [{ language: { name: "es" } }] };

    const result = mapPokemon(noImage, noEnglish);

    expect(result.image).toBe("");
    expect(result.about).toBe("");
    expect(result.evolutions).toEqual([]);
  });

  test("maneja correctamente URL sin id de especie", () => {
    const evoChain = {
      chain: {
        species: { name: "missing", url: "https://pokeapi.co/api/v2/pokemon-species/" },
        evolves_to: [],
      },
    } as any;

    const result = mapPokemon(rawPokemon, rawSpecies, evoChain);
    expect(result.evolutions[0].image).toContain("/0.png");
  });
});
