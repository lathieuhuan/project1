import "../assets/css/Welcome.css";

export function Welcome(props) {
  return props.score === undefined ? (
    <div className="flex-col-center parent-size" id="home">
      <h1 id="home_heading">WELCOME!</h1>
      <p id="home_line">Test your football knowledge with our app.</p>
      <button onClick={props.newGame}>Begin</button>
    </div>
  ) : (
    <div className="flex-col-center parent-size" id="home">
      <h1 id="home_heading">You've finished all question.</h1>
      <p id="home_line">Your total score is {props.score}</p>
      <button onClick={props.newGame}>Try again</button>
    </div>
  );
}