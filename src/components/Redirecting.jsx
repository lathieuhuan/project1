import "../assets/css/SignIU.css";

export function Redirecting(props) {
  const { nickname, setAppState } = props;
  return (
    <div className="signIU-form wide-padding thin-border small-b-radius col-center">
      <h1>SIGNUP SUCCESSFUL</h1>
      <div className="flex">
        <button style={{ marginRight: "15px" }} onClick={() => {
          setAppState("None", nickname, nickname);
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("username", nickname);
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