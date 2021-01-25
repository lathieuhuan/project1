import "../../assets/css/cmgCss/Setup.css";

export function Setup(props) {
  return (
    <div className="col-container" id="setup">
      <div className="group col-container">
        <label>Choose difficulty:</label>
        <div>
          <input
            type="radio"
            name="difficulty"
            className="difficulty"
            value="Easy"
            checked
          />
          <label htmlFor="easy">Easy</label>
          <input
            type="radio"
            name="difficulty"
            className="difficulty"
            value="Hard"
          />
          <label htmlFor="hard">Hard</label>
        </div>
      </div>
      <div className="group col-container">
        <label>Choose card type:</label>
        <div id="card-type">
          <p id="show-line">Classic</p>
          <div id="dropdown" className="hidden">
            <input type="button" className="type" value="Classic" />
            <input type="button" className="type" value="LoL Champions" />
          </div>
        </div>
      </div>
      <button id="start">START</button>
    </div>
  );
}