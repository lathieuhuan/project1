import "../assets/css/SignIU.css";

export function Redirecting(props) {
  const { username, setAppState } = props;
  return (
    <div className="flex-col border-2 radius-5 padding-20" id="modal_inner">
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
}