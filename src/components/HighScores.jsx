import "../assets/css/HighScores.css";

export function HighScores(props) {
  let highScores = props.highScores;
  for (let i = highScores.length; i < 10; i++) {
    highScores.push({ username: "" })
  }
  return (
    <div className="high-scores">
      <div className="hs_inner border-3 radius-5">
        <h1 className="hs_heading">HIGH SCORES <sup>{props.mode}</sup></h1>
        <div className="list">
          {props.highScores.map((score, i) => {
            return (
              <div key={i} className="row">
                <p className={"rank-num " + (i < 3 ? "top-3" : "top-10")}>
                  {i + 1}
                </p>
                <p>{score.username}</p>
                <p className="score">{score.value} {props.unit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}