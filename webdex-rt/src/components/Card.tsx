function Card() {
  return (
    <>
      <section className="card">
        <div id="pokemon-image-container" className="pokemon-image-container">
          <img id="pokemon-image-placeholder" src="../src/assets/question.png" alt="Pokemon" />
        </div>
        <div className="pokemon-name-container">
          <p id="pokemon-name" className="pokemon-name">
            ...
          </p>
        </div>
        <div id="pokemon-type-container" className="pokemon-type-container">
          <p id="pokemon-type" className="pokemon-type">
            Type
          </p>
        </div>
        <div className="pokemon-number-container">
          <p id="pokemon-number" className="pokemon-number">
            #0
          </p>
        </div>
        <div className="about-container">
          <h3 className="about-title">About:</h3>
          <p id="about-text" data-testid="about-text" className="about-text"></p>
        </div>
      </section>
    </>
  );
}

export default Card;
