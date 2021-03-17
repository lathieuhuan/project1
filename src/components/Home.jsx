import "../assets/css/Home.css";

export function Home(props) {
  return props.score === undefined ? (
    <div className="flex-col-center parent-size" id="home">
      <h1 id="home_heading">WELCOME TO QUIZ APP</h1>
      <p id="home_line">Test your sport knowledge now!</p>
      <button onClick={props.newGame}>Begin</button>
    </div>
  ) : (
    <div className="flex-col-center parent-size" id="home">
      <h1 id="home_heading">You've finished all question.</h1>
      <p id="home_line">Your total score is <b>{props.score}</b>.</p>
      <button onClick={props.newGame}>Try again</button>
    </div>
  );
}