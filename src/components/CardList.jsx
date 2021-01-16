import '../assets/css/CardList.css';
import { InfoCard } from "./InfoCard";

function CardList(props) {
    return <div className="col">
      {props.data.map((val, i) => {
        return <InfoCard key={i}
          index={i}
          {...val}
          place={props.col}
          toggleDesc={props.toggleDesc} />
      })}
    </div>;
}

export { CardList }