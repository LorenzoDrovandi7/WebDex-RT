import type { Pokemon, PokemonRaw, PokemonSpeciesRaw, EvolutionChainRaw } from "../types/pokemon";
import { fetchData } from "./pokeApi";
import { mapPokemon } from "../mappers/pokemonMapper";

export async function loadPokemon(nameOrId: string): Promise<Pokemon> {
  const rawPokemon = await fetchData<PokemonRaw>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  const rawSpecies = await fetchData<PokemonSpeciesRaw>(`https://pokeapi.co/api/v2/pokemon-species/${nameOrId}`);
  const rawEvolutionChain = await fetchData<EvolutionChainRaw>(rawSpecies.evolution_chain.url);
  const pokemon = mapPokemon(rawPokemon, rawSpecies, rawEvolutionChain);

  return pokemon;
}
