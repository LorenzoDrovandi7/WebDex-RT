function Data() {
  return (
    <>
      <section className="data">
        <div className="data-container">
          <div className="abilities-container">
            <h3 className="abilities-title">Abilities:</h3>
            <p id="abilities-text" data-testid="abilities-text" className="abilities-text"></p>
          </div>
          <div className="weight-height-container">
            <h3 className="weight-title">Weight:</h3>
            <p id="weight-text" className="weight-text">
              0
            </p>
            <h3 className="height-title">Height:</h3>
            <p id="height-text" className="height-text">
              0
            </p>
          </div>
          <div className="species-data-container">
            <h3 className="capture-rate-title">Capture rate:</h3>
            <p id="capture-rate-text" className="capture-rate-text">
              ...
            </p>
            <h3 className="egg-group-title">Egg group:</h3>
            <p id="egg-group-text" className="egg-group-text">
              ...
            </p>
            <h3 className="growth-rate-title">Growth rate:</h3>
            <p id="growth-rate-text" className="growth-rate-text">
              ...
            </p>
            <h3 className="generation-title">Generation:</h3>
            <p id="generation-text" className="generation-text">
              ...
            </p>
          </div>
          <div className="evolution-container">
            <h3 className="evolution-title">Evolution chain:</h3>
          </div>
          <div className="movements-container">
            <p className="title-movement-list">List of movements:</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Data;
