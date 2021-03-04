import "../../assets/css/2048/SideBar.css";

export function SideBar(props) {
  return (
    <div id="g2048_side-bar">
      <div id="g2048_score">
        <p className="desc">SCORE:</p>
        <p className="num">2048</p>
      </div>
      <button className="start-btn">NEW GAME</button>
    </div>
  );
}