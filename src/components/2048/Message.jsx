import "../../assets/css/2048/Message.css";

export function Message(props) {
  let line;
  if (props.newHS) {
    line = <p id="g2048ms_line">You made a new High Score!</p>
  }
  return (
    <div id="g2048_ms">
      <h1 id="g2048ms_heading">{props.gameState}</h1>
      {line}
    </div>
  );
}