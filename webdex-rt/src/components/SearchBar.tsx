function SearchBar() {
  return (
    <>
      <section className="search-bar">
        <div className="button-selector">
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
          <button className="pokemon-button">-Select a Pokemon-</button>
        </div>
        <input id="pokemon-input" className="input-search" placeholder="Name or Number" />
        <button id="search-button" className="search-button">
          Search
        </button>
      </section>
    </>
  );
}

export default SearchBar;
