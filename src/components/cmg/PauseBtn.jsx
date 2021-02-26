import "../../assets/css/cmg/PauseBtn.css";

export function PauseBtn(props) {
  return (
    <button className="pause-btn border-2 flex-center"
      onClick={props.switchPause}>
      <i className={
        props.gameState === "paused" ? "fa fa-play" : "fa fa-pause"
      }></i>
    </button>
  );
}