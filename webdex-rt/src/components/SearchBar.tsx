import { useState, useEffect } from "react";

interface SearchBarProps {
  onSelect: (nameOrId: string) => void;
}

interface SimplePokemon {
  name: string;
  url: string;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [allPokemon, setAllPokemon] = useState<SimplePokemon[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
      .then((res) => res.json())
      .then((data) => setAllPokemon(data.results))
      .catch(console.error);
  }, []);

  const handleSelect = (nameOrId: string) => {
    onSelect(nameOrId);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) handleSelect(input.toLowerCase());
  };

  return (
    <section className="search-bar">
      <div className="button-selector">
        {allPokemon.slice(0, 151).map((p) => (
          <button key={p.name} className="pokemon-button" onClick={() => handleSelect(p.name)}>
            {p.name}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Name or Number"
          className="input-search"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </section>
  );
}
