import "../../assets/css/cmgCss/LeftCol.css";

export function LeftCol() {
  return (
    <div className="left-col">
      <h1>Card Memory Game</h1>
      <h3>HOW TO PLAY:</h3>
      <p>Click on a card to flip it up or down. A pair of cards flipped up
        together in sequence will disappear if they are identical. Try to
        clear them all within <b>15 seconds</b> in Easy Mode or <b>25
        seconds</b> in Hard Mode!</p>
      <p><i>Note: you cannot choose the cards that are being flipped or the
        ones that will disappear.</i></p>
    </div>
  );
}