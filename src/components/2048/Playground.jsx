import "../../assets/css/2048/Playground.css";
import { Tile } from "./Tile";

export function Playground(props) {
  let cells = [];
  for (let i = 0; i < 16; i++) {
    cells.push(<div key={i} className="cell"></div>)
  }
  // console.log(props.tiles);
  return (
    <div id="g2048_playground">
      <div id="g2048_pedestal">
        {cells}
      </div>
      <div id="g2048_bowl">
        {props.tiles.map((tile, i) => {
          return <Tile key={i} tile={tile} index={i} adjust={props.adjust} />;
        })}
      </div>
    </div>
  );
}