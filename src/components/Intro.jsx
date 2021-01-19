import "../assets/css/Intro.css";

export function Intro(props) {
  return (<div id="intro">
    <h1>CREATE YOUR TASK LISTS WITH OUR TO-DO APP!</h1>
    <h2>Some features introduction...</h2>
    <button id="signup-btn" onClick={() => props.changeUI("signing-up")}>
      Sign up
    </button>
  </div>);
}