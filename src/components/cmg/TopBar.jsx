import "../../assets/css/cmg/TopBar.css";
import { Timer } from "./Timer"
import { PauseBtn } from "./PauseBtn";

export function TopBar(props) {
  return (
    <div className="border-2 radius-10" id="cmg_top-bar">
      <p className="desc">Time Limit:</p>
      <p className="num radius-5">
        <Timer time={props.limit} />
      </p>
      <p className="desc">Time Passed:</p>
      <p className="num radius-5">
        <Timer time={
          props.gameState === "delay" || props.gameState === "welcome"
          ? 0 : props.time} />
      </p>
      <PauseBtn gameState={props.gameState} switchPause={props.switchPause} />
    </div>
  );
}