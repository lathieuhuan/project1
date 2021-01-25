import "../../assets/css/cmgCss/PauseBtn.css";

export function PauseBtn(props) {
  return (
    <button className="flex-center" id="pause-btn"
      onClick={props.switchPause}>
      <i className={
        props.gameState === "Paused" ? "fa fa-play" : "fa fa-pause"
      }></i>
    </button>
  );
}