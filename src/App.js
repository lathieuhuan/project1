import logo from "./logo.svg";
import "./App.css";
import { signUp, addTodo } from "./ultis/ultis";

signUp({ username: "john", password: "123" })
  .then((userId) => {
    console.log(userId);
  })
  .catch((err) => {
    console.log(err);
  });

addTodo({
  owner: "w6whE4WVpHH8rHDWBNyT",
  title: "housework",
  content: "Cooking",
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
