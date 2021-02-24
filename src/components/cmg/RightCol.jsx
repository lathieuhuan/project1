import "../../assets/css/cmg/RightCol.css";
import { Stats } from "./Stats";
import { PauseBtn } from "./PauseBtn";
import { Setup } from "./Setup";

export function RightCol(props) {
  return (
    <div className="right-col">
      <Stats limit={props.limit} time={props.time} />
      <PauseBtn gameState={props.gameState} switchPause={props.switchPause} />
      <Setup startGame={props.startGame} />
    </div>
  );
}
