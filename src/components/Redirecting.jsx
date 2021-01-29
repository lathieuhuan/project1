import "../assets/css/SignIU.css";

export function Redirecting(props) {
  const { username, setAppState } = props;
  return (
    <div className="signIU-form wide-padding thin-border small-b-radius col-center">
      <h1>SIGNUP SUCCESSFUL</h1>
      <div>
        <button style={{ marginRight: "15px" }} onClick={() => {
          setAppState("None", username, username);
          localStorage.setItem("username", username);
          localStorage.setItem("userId", username);
        }}>
          Sign In
        </button>
        <button onClick={() => setAppState("None")}>
          Not Sign In
        </button>
      </div>
    </div>
  );
}