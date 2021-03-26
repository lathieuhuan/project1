import "../../assets/css/1024/GameModal.css";

export function GameModal(props) {
  let line;
  if (props.newHS) {
    line = <p id="g1024ms_line">You made a new High Score!</p>
  }
  return (
    <div>
      {props.gameState === "running" ? (
        <div>
          <button className="fa fa-angle-left" id="g1024_goLeft"
            onClick={props.moveLeft}></button>
          <button className="fa fa-angle-right" id="g1024_goRight"
            onClick={props.moveRight}></button>
          <button className="fa fa-angle-up" id="g1024_goUp"
            onClick={props.moveUp}></button>
          <button className="fa fa-angle-down" id="g1024_goDown"
            onClick={props.moveDown}></button>
        </div>
      ) : (
        <div className="parent-size" id="g1024_ms">
          <h1 id="g1024ms_heading">{props.gameState}</h1>
          {line}
        </div>
      )}
    </div>
  );
}