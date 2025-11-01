import { usePokemon } from "../hooks/usePokemon";

function Card({ nameOrId }: { nameOrId: string }) {
  const { pokemon } = usePokemon(nameOrId);

  return (
    <>
      <section className="card">
        <div id="pokemon-image-container" className="pokemon-image-container">
          <img
            id="pokemon-image-placeholder"
            src={pokemon?.image || "../src/assets/question.png"}
            alt={pokemon?.name || "Pokemon"}
          />
        </div>
        <div className="pokemon-name-container">
          <p id="pokemon-name" className="pokemon-name">
            {pokemon?.name || "..."}
          </p>
        </div>
        <div id="pokemon-type-container" className="pokemon-type-container">
          {pokemon?.types.length ? (
            pokemon.types.map((type) => (
              <span key={type} className={`pokemon-type ${type}`}>
                {type}
              </span>
            ))
          ) : (
            <span className="pokemon-type">Type</span>
          )}
        </div>
        <div className="pokemon-number-container">
          <p id="pokemon-number" className="pokemon-number">
            {pokemon ? `#${pokemon.id}` : "#0"}
          </p>
        </div>
        <div className="about-container">
          <h3 className="about-title">About:</h3>
          <p id="about-text" data-testid="about-text" className="about-text">
            {pokemon?.about || "..."}
          </p>
        </div>
      </section>
    </>
  );
}

export default Card;
