import type { Pokemon, PokemonRaw, PokemonSpeciesRaw, EvolutionChainRaw } from "../types/pokemon";

export function mapPokemon(
  rawPokemon: PokemonRaw,
  rawSpecies: PokemonSpeciesRaw,
  rawEvolutions?: EvolutionChainRaw
): Pokemon {
  return {
    id: rawPokemon.id,
    name: rawPokemon.name,
    image: rawPokemon.sprites.other["official-artwork"].front_default || "",
    types: rawPokemon.types.map((t) => t.type.name),
    about: getDescription(rawSpecies.flavor_text_entries),
    abilities: rawPokemon.abilities.map((a) => a.ability.name),
    weight: rawPokemon.weight / 10,
    height: rawPokemon.height / 10,
    captureRate: rawSpecies.capture_rate,
    eggGroups: rawSpecies.egg_groups.map((e) => e.name),
    growthRate: rawSpecies.growth_rate.name,
    generation: rawSpecies.generation.name,
    evolutions: rawEvolutions ? extractEvolutions(rawEvolutions.chain) : [],
    moves: rawPokemon.moves.map((m) => m.move.name),
    stats: rawPokemon.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
}

function getDescription(entries: PokemonSpeciesRaw["flavor_text_entries"]): string {
  const entry = entries.find((e) => e.language.name === "en");
  return entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "";
}

function extractEvolutions(chain: EvolutionChainRaw["chain"]): { name: string; image: string }[] {
  const evolutions: { name: string; image: string }[] = [];

  function traverse(node: EvolutionChainRaw["chain"]) {
    const idMatch = node.species.url.match(/\/pokemon-species\/(\d+)\//);
    const id = idMatch ? idMatch[1] : "0";
    evolutions.push({
      name: node.species.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    });

    node.evolves_to.forEach(traverse);
  }

  traverse(chain);
  return evolutions;
}
