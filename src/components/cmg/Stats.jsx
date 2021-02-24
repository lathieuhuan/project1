import "../../assets/css/cmg/Stats.css";
import { Timer } from "./Timer"

export function Stats(props) {
  return (
    <div className="stats flex thinner-border medium-b-radius">
      <p className="desc">Time Limit:</p>
      <p className="num">
        <Timer time={props.limit} />
      </p>
      <p className="desc">Time Passed:</p>
      <p className="num">
        <Timer time={props.time} />
      </p>
    </div>
  );
}