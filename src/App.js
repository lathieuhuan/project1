import "./App.css";
import { Playground } from "./components/Playground";

function App(props) {
  return <Playground difficulty={props.difficulty} type={props.type} />;
}

export default App;
