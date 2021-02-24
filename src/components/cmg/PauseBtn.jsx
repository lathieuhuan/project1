import "../../assets/css/cmg/PauseBtn.css";

export function PauseBtn(props) {
  return (
    <button className="flex-center pause-btn"
      onClick={props.switchPause}>
      <i className={
        props.gameState === "Paused" ? "fa fa-play" : "fa fa-pause"
      }></i>
    </button>
  );
}