function Stats() {
  return (
    <>
      <section className="stats">
        <div className="hp-container-index">
          <p className="hp-text-index">HP</p>
          <div className="hp-container">
            <p id="hp-text" className="hp-text">
              100
            </p>
          </div>
        </div>
        <div className="attack-container-index">
          <p className="attack-text-index">ATT</p>
          <div className="attack-container">
            <p id="attack-text" className="attack-text">
              100
            </p>
          </div>
        </div>
        <div className="defense-container-index">
          <p className="defense-text-index">DEF</p>
          <div className="defense-container">
            <p id="defense-text" className="defense-text">
              100
            </p>
          </div>
        </div>
        <div className="s-attack-container-index">
          <p className="s-attack-text-index">S.ATT</p>
          <div className="s-attack-container">
            <p id="s-attack-text" className="s-attack-text">
              100
            </p>
          </div>
        </div>
        <div className="s-defense-container-index">
          <p className="s-defense-text-index">S.DEF</p>
          <div className="s-defense-container">
            <p id="s-defense-text" className="s-defense-text">
              100
            </p>
          </div>
        </div>
        <div className="speed-container-index">
          <p className="speed-text-index">SPED</p>
          <div className="speed-container">
            <p id="speed-text" className="speed-text">
              100
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Stats;
