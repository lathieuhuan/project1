import "../../assets/css/cmgCss/Stats.css";
import { Timer } from "./Timer"

export function Stats(props) {
  return (
    <div id="stats">
      <p className="desc">Time:</p>
      <p className="num" id="time">
        <Timer time={props.time} />
      </p>
      <p className="desc">Best Record:</p>
      <p className="num" id="record">
        <Timer time={props.bestRecord} />
      </p>
    </div>
  );
}