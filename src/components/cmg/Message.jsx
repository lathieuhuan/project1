import "../../assets/css/cmg/Message.css";

export function Message(props) {
  const { gameState, newRecord } = props;
  let mess, extraMess;
  if (gameState === "Won") {
    mess = "YOU WON!";
    if (newRecord) {
      extraMess = <p>New Record!</p>
    }
  } else if (gameState === "Lost") {
    mess = "GAME OVER!";
  } else if (gameState === "Paused") {
    mess = "PAUSED";
  } else {
    mess = "WELCOME";
  }
  return (
    <div className="message">
      <h1>{mess}</h1>
      {extraMess}
    </div>
  );
}