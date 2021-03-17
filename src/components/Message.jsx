import "../assets/css/Message.css";

export function Message(props) {
  return (
    <div className="flex-col-center parent-size">
      <p id="ms_title">{props.correct
        ? "Your answer is correct."
        : "Your answer is not correct."
      }</p>
      <button onClick={props.backToPG}>Next Question</button>
    </div>
  );
}