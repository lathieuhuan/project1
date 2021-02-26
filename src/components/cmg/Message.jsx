import "../../assets/css/cmg/Message.css";

export function Message(props) {
  const { gameState, newRecord } = props;
  let line;
  if (gameState === "you won!" && newRecord) {
    line = <p id="cmgms_line">New Record!</p>
  }
  return (
    <div className="border-3 radius-10" id="cmg_message">
      <h1 id="cmgms_heading">{gameState}</h1>
      {line}
    </div>
  );
}