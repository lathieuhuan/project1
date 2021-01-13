import "../assets/css/Message.css";

export function Message(props) {
  return <div id="message">
    <h1>CONGRATULATION!</h1>
    <h2>You've solved the Puzzle!</h2>
    <button onClick={props.restart} id="new-game">NEW GAME</button>
  </div>
}