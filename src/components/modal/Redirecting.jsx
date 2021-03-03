
export function Redirecting(props) {
  const { modal, username, setAppState } = props;
  let content, doAsk = true;
  if (modal === "Notice successful sign-up") {
    content = (
      <div className="modal_inner border-2 radius-10 padding-20 flex-col" id="notice-signup">
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
  } else if (modal === "Ask user to sign in") {
    content = (
      <div className="modal_inner border-2 radius-10 padding-20 flex-col" id="ask-signin">
        <h1 id="modal_heading">SIGN IN TO SAVE YOUR SCORE!</h1>
        <div className="flex-center">
          <button className="modal_main-line last-btn" onClick={() => {
            setAppState("SignIn");
          }}>
            Sign In / Sign Up
          </button>
          <button className="modal_main-line last-btn" onClick={() => {
            setAppState("None");
            if (!doAsk) {
              localStorage.setItem("doAsk", "false");
            }
          }}>
            Play as Guest
          </button>
        </div>
        <form id="ask-bar">
          <input type="checkbox" className="stop-btn" onClick={() => { doAsk = !doAsk }} />
          <label>Stop asking</label>
        </form>
      </div>
    );
  } else {
    content = <p>Wrong modal input to Redirecting</p>
  }
  return content;
}