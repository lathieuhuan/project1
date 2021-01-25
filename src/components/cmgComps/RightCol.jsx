import "../../assets/css/cmgCss/RightCol.css";
import { Stats } from "./Stats";
import { PauseBtn } from "./PauseBtn";
import { Setup } from "./Setup";

export function RightCol(props) {
  return (
    <div id="right-col">
      <Stats time={props.time} bestRecord={props.bestRecord} />
      <PauseBtn gameState={props.gameState} switchPause={props.switchPause} />
      <Setup startGame={props.startGame} />
    </div>
  );
}
