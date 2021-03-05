import "../../assets/css/cmg/Menu.css";
import { Setup } from "./Setup";

export function Menu(props) {
  const { gameState } = props;
  let line;
  if (gameState === "you won!" && props.newHS) {
    line = <p id="cmgmn_line">You made a new High Score!</p>
  }
  return (
    <div id="cmg_menu">
      <div>
        <h1 id="cmgmn_heading">{gameState}</h1>
        {line}
      </div>
      <Setup
        startGame={props.startGame}
        difficulty={props.difficulty}
        type={props.type}
        fullscreen={props.fullscreen}
        toggleFullscreen={props.toggleFullscreen}
      />
    </div>
  );
}