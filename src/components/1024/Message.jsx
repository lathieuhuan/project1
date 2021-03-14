import "../../assets/css/1024/Message.css";

export function Message(props) {
  let line;
  if (props.newHS) {
    line = <p id="g1024ms_line">You made a new High Score!</p>
  }
  return (
    <div className="parent-size" id="g1024_ms">
      <h1 id="g1024ms_heading">{props.gameState}</h1>
      {line}
    </div>
  );
}