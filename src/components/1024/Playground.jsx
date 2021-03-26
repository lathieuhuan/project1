import "../../assets/css/1024/Playground.css";
import { Tile } from "./Tile";
import { GameModal } from "./GameModal";

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
      <GameModal
        gameState={props.gameState}
        newHS={props.newHS}
        moveLeft={props.moveLeft}
        moveRight={props.moveRight}
        moveUp={props.moveUp}
        moveDown={props.moveDown}
      />
    </div>
  );
}