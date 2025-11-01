import { useState, useEffect } from "react";
import type { Pokemon } from "../types/pokemon";
import { loadPokemon } from "../services/loadPokemon";

export function usePokemon(nameOrId: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nameOrId) return;

    setLoading(true);
    setError(null);

    loadPokemon(nameOrId)
      .then((data) => setPokemon(data))
      .catch((err) => setError(err.message || "Unknown error"))
      .finally(() => setLoading(false));
  }, [nameOrId]);

  return { pokemon, loading, error };
}
