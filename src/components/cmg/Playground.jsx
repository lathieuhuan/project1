import "../../assets/css/cmg/Playground.css";
import { Card } from "./Card";

export function Playground(props) {
  return (
    <div
      className="cmg_playground border-3 radius-10"
      id={props.difficulty === "easy" ? "large-pg" : "small-pg"}
    >
      {props.cards.map((val, i) => {
        return (
          <Card
            key={i}
            index={i}
            size={props.difficulty === "easy" ? "card-large" : "card-small"}
            {...val}
            setAnimation={props.setAnimation}
            flip={props.flip}
            process={props.process}
          />
        );
      })}
    </div>
  );
}