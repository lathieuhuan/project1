import "../../assets/css/cmgCss/Playground.css";
import { Card } from "./Card";

export function Playground(props) {
  return (
    <div className="playground">
      {props.cards.map((val, i) => {
        return (
          <Card
            key={i}
            index={i}
            size={props.difficulty === "Easy" ? "card-large" : "card-small"}
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