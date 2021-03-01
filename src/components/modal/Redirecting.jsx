
export function Redirecting(props) {
  const { modal, username, setAppState } = props;
  let content;
  if (modal === "Notice successful sign-up") {
    content = (
      <div className="flex-col border-2 radius-10 padding-20" id="modal_inner">
        <h1 id="modal_heading">SIGNUP SUCCESSFUL</h1>
        <div className="flex-center">
          <button className="modal_main-line last-btn" onClick={() => {
            setAppState("None", username, username);
            localStorage.setItem("username", username);
            localStorage.setItem("userId", username);
          }}>
            Sign In
          </button>
          <button className="modal_main-line last-btn" onClick={() => setAppState("None")}>
            Not Sign In
          </button>
        </div>
      </div>
    );
  } else if (modal === "Ask to sign in") {
    content = (
      <div className="flex-col border-2 radius-10 padding-20" id="modal_inner">
        <h1 id="modal_heading">SIGN IN TO SAVE YOUR SCORE!</h1>
        <div className="flex-center">
          <button className="modal_main-line last-btn" onClick={() => {
            setAppState("SignIn");
          }}>
            Sign In / Sign Up
          </button>
          <button className="modal_main-line last-btn" onClick={() => {
            setAppState("None")
          }}>
            Play as Guest
          </button>
        </div>
      </div>
    );
  } else {
    content = <p>Wrong modal input to Redirecting</p>
  }
  return content;
}