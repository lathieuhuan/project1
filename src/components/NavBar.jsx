import "../assets/css/NavBar.css";

export function NavBar(props) {
  return (<div id="nav-bar">
    <input type="button"
      onClick={() => {
        props.changeUI(props.UIstate === "signed-in" ? "intro" : "signed-in")
      }}
      value={props.UIstate === "signed-in" ? "Sign out" : "Sign in"} />
    <input type="button" value="About" />
  </div>);
}