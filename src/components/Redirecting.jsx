import "../assets/css/Redirecting.css";

export function Redirecting(props) {
  let message;
  if (props.UIstate === "done-signing-up") {
    message = "Signup successful";
  }
  return (<div id="redirecting">
    <h2>{message}</h2>
    <button onClick={() => {
      if (props.UIstate === "done-signing-up") {
        props.changeUI("signed-in");
      }
    }}>
      Confirm
    </button>
  </div>);
}