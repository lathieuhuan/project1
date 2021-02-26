import "../../assets/css/cmg/Stats.css";
import { Timer } from "./Timer"

export function Stats(props) {
  return (
    <div className="border-2 radius-10" id="cmgrc_stats">
      <p className="desc">Time Limit:</p>
      <p className="num radius-5">
        <Timer time={props.limit} />
      </p>
      <p className="desc">Time Passed:</p>
      <p className="num radius-5">
        <Timer time={props.time} />
      </p>
    </div>
  );
}