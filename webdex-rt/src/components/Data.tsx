import { usePokemon } from "../hooks/usePokemon";

function Data({ nameOrId }: { nameOrId: string }) {
  const { pokemon } = usePokemon(nameOrId);

  return (
    <section className="data">
      <div className="data-container">
        <div className="abilities-container">
          <h3 className="abilities-title">Abilities:</h3>
          <p id="abilities-text" data-testid="abilities-text" className="abilities-text">
            {pokemon?.abilities.join(", ") || "..."}
          </p>
        </div>

        <div className="weight-height-container">
          <h3 className="weight-title">Weight:</h3>
          <p id="weight-text" className="weight-text">
            {pokemon?.weight || 0}
          </p>

          <h3 className="height-title">Height:</h3>
          <p id="height-text" className="height-text">
            {pokemon?.height || 0}
          </p>
        </div>

        <div className="species-data-container">
          <h3 className="capture-rate-title">Capture rate:</h3>
          <p id="capture-rate-text" className="capture-rate-text">
            {pokemon?.captureRate ?? "..."}
          </p>

          <h3 className="egg-group-title">Egg group:</h3>
          <p id="egg-group-text" className="egg-group-text">
            {pokemon?.eggGroups.join(", ") || "..."}
          </p>

          <h3 className="growth-rate-title">Growth rate:</h3>
          <p id="growth-rate-text" className="growth-rate-text">
            {pokemon?.growthRate || "..."}
          </p>

          <h3 className="generation-title">Generation:</h3>
          <p id="generation-text" className="generation-text">
            {pokemon?.generation || "..."}
          </p>
        </div>

        <div className="evolution-container">
          <h3 className="evolution-title">Evolution chain:</h3>
          {pokemon?.evolutions?.length ? (
            <div className="evolution-chain">
              {pokemon.evolutions.map((evo) => (
                <div key={evo.name} className="evolution-item">
                  <img src={evo.image} alt={evo.name} className="evolution-sprite" />
                  <p className="evolution-name">{evo.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>...</p>
          )}
        </div>

        <div className="movements-container">
          <p className="title-movement-list">List of movements:</p>
          {pokemon?.moves.map((move) => (
            <p className="movement-item" key={move}>
              {move}
            </p>
          )) || <p></p>}
        </div>
      </div>
    </section>
  );
}

export default Data;
