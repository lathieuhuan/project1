import "../assets/css/Modal.css";
import { Redirecting } from "./modal/Redirecting";
import { SignIn } from "./modal/SignIn";
import { SignUp } from "./modal/SignUp";

export function Modal(props) {
  const { modal, username, avatar, setAppState } = props;
  let content;
  if (modal === "SignIn") {
    content = <SignIn setAppState={setAppState} />
  } else if (props.modal === "SignUp") {
    content = <SignUp setAppState={setAppState} />
  } else {
    content = (
      <Redirecting
        modal={modal}
        username={username}
        avatar={avatar}
        setAppState={setAppState}
      />
    )
  }
  return (
    <div className="flex-center" id="modal">
      {content}
    </div>
  );
}