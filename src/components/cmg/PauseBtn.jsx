import "../../assets/css/cmg/PauseBtn.css";

export function PauseBtn(props) {
  return (
    <button className="pause-btn flex-center"
      onClick={props.switchPause}>
      <p className={
        props.gameState === "paused" ? "fa fa-play" : "fa fa-pause"
      }></p>
    </button>
  );
}