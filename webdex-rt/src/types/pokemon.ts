export interface PokemonStatRaw {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonRaw {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  moves: { move: { name: string } }[];
  stats: PokemonStatRaw[];
}

export interface PokemonSpeciesRaw {
  capture_rate: number;
  egg_groups: { name: string }[];
  growth_rate: { name: string };
  generation: { name: string };
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  evolution_chain: { url: string };
}

export interface EvolutionChainRaw {
  chain: {
    species: { name: string };
    evolves_to: EvolutionChainRaw["chain"][];
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  about: string;
  abilities: string[];
  weight: number;
  height: number;
  captureRate: number;
  eggGroups: string[];
  growthRate: string;
  generation: string;
  evolutions: {
    name: string;
    image: string;
  }[];
  moves: string[];
  stats: {
    name: string;
    value: number;
  }[];
}
