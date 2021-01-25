import "../../assets/css/cmgCss/RightCol.css";
import { Stats } from "./Stats";
import { PauseBtn } from "./PauseBtn";
import { Setup } from "./Setup";

export function RightCol(props) {
  const { running, gameState, switchPause, stopGame, makeNewRecord } = props;
  return (
    <div id="right-col">
      <Stats
        running={running}
        gameState={gameState}
        stopGame={stopGame}
        makeNewRecord={makeNewRecord}
      />
      <PauseBtn gameState={gameState} switchPause={switchPause} />
      <Setup />
    </div>
  );
}
