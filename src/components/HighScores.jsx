import "../assets/css/HighScores.css";

export function HighScores(props) {
  return (
    <div id="high-scores">
      <div className="thin-border medium-b-radius">
        <h1>HIGH SCORES</h1>
        <div className="medium-padding">
          {props.highScores.map((val, i) => {
            return (
              <div key={i}>
                <p>{i + 1}</p>
                <p>{val.username}</p>
                <p>{val.score}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}