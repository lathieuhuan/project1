import "../../assets/css/common/Introduction.css";

export function Introduction() {
  return (
    <div id="ingame_intro">
      <h1 id="ingame_title">1024</h1>
      <h3 id="ingame_heading">HOW TO PLAY:</h3>
      <p className="ingame_line">
        Use Arrow Keys to move the tiles. When a couple of same tiles collide
        they will merge into one and the number inside are doubled. Try to
        reach the number <b>1024</b>!
      </p>
    </div>
  );
}