import Card from "./components/Card.tsx";
import Data from "./components/Data.tsx";
import SearchBar from "./components/SearchBar.tsx";
import Stats from "./components/Stats.tsx";

function App() {
  return (
    <>
      <nav>
        <img src="src/assets/WebDex-logo.svg" className="logo" />
      </nav>
      <div className="app-container">
        <Card />
        <Stats />
        <Data />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
