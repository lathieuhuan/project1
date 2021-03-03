import "../../assets/css/cmg/RightCol.css";
import { PauseBtn } from "./PauseBtn";

export function RightCol(props) {
  return (
    <div id="cmg_right-col">
      <PauseBtn gameState={props.gameState} switchPause={props.switchPause} />
    </div>
  );
}
