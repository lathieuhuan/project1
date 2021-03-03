import "../../assets/css/cmg/Introduction.css";

export function Introduction() {
  return (
    <div id="cmg_intro">
      <h1 id="cmgit_title">Card Memory Game</h1>
      <h3 id="cmgit_heading">HOW TO PLAY:</h3>
      <p className="cmgit_line">
        Click on a card to flip it up or down. A pair of cards flipped up
        together in sequence will disappear if they are identical. You cannot
        choose the cards that are being flipped or the ones that will
        disappear. Try to clear them all within <b>12 seconds</b> in Easy Mode
        or <b>20 seconds</b> in Hard Mode!
      </p>
    </div>
  );
}