import "../../assets/css/2048/Playground.css";
import { Tile } from "./Tile";
import { Message } from "./Message";

export function Playground(props) {
  let cells = [];
  for (let i = 0; i < 16; i++) {
    cells.push(<div key={i} className="cell"></div>)
  }
  return (
    <div id="g2048_playground">
      <div id="g2048_pedestal">
        {cells}
      </div>
      <div id="g2048_bowl">
        {props.tiles.map((tile, i) => {
          return (
            <Tile
              key={i}
              tile={tile}
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