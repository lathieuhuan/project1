import "../../assets/css/1024/Playground.css";
import { Tile } from "./Tile";
import { Message } from "./Message";

export function Playground(props) {
  let cells = [];
  for (let i = 0; i < 25; i++) {
    cells.push(<div key={i} className="cell"></div>)
  }
  return (
    <div id="g1024_playground">
      <div className="parent-size" id="g1024_pedestal">
        {cells}
      </div>
      <div className="parent-size" id="g1024_bowl">
        {props.tiles.map((tile, i) => {
          return (
            <Tile
              key={i}
              tile={tile}
              movement={props.movements[i]}
              index={i}
              nullifyType={props.nullifyType}
            />
          );
        })}
      </div>
      {props.gameState === "running" ? null
        : <Message gameState={props.gameState} newHS={props.newHS} />}
    </div>
  );
}