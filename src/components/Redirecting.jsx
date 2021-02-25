import "../assets/css/SignIU.css";

export function Redirecting(props) {
  const { username, setAppState } = props;
  return (
    <div className="signIU-form flex-col border-2 radius-5 padding-20">
      <h1 className="center-text">SIGNUP SUCCESSFUL</h1>
      <div className="flex-center">
        <button className="line last-btn" onClick={() => {
          setAppState("None", username, username);
          localStorage.setItem("username", username);
          localStorage.setItem("userId", username);
        }}>
          Sign In
        </button>
        <button className="line last-btn" onClick={() => setAppState("None")}>
          Not Sign In
        </button>
      </div>
    </div>
  );
}