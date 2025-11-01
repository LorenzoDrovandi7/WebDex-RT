import { useState } from "react";
import Card from "./components/Card";
import Data from "./components/Data";
import SearchBar from "./components/SearchBar";
import Stats from "./components/Stats";

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<string>(""); // nombre o id

  return (
    <>
      <nav>
        <img src="src/assets/WebDex-logo.svg" className="logo" />
      </nav>
      <div className="app-container">
        <SearchBar onSelect={setSelectedPokemon} />

        {selectedPokemon && (
          <>
            <Card nameOrId={selectedPokemon} />
            <Stats nameOrId={selectedPokemon} />
            <Data nameOrId={selectedPokemon} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
