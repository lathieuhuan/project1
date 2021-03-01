import "../../assets/css/cmg/Message.css";

export function Message(props) {
  const { gameState, newHS } = props;
  let line;
  if (gameState === "you won!" && newHS) {
    line = <p id="cmgms_line">You made a High Score!</p>
  }
  return (
    <div className="border-3 radius-10" id="cmg_message">
      <h1 id="cmgms_heading">{gameState}</h1>
      {line}
    </div>
  );
}