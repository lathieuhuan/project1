import "../../assets/css/common/Introduction.css";

export function Introduction() {
  return (
    <div id="ingame_intro">
      <h1 id="ingame_title">Card Memory Game</h1>
      <h3 id="ingame_heading">HOW TO PLAY:</h3>
      <p className="ingame_line">
        Click on a card to flip it up or down. A pair of cards flipped up
        together in sequence will disappear if they are identical. You cannot
        choose the cards that are being flipped or the ones that will
        disappear. Try to clear them all within <b>15 seconds</b> in Easy Mode
        or <b>25 seconds</b> in Hard Mode!
      </p>
    </div>
  );
}