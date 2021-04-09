import "./App.css";
import React, { useState } from "react";

function App() {
  const [num, setNum] = useState(0);
  const countUp = () => {
    setInterval(() => {
      setNum((prev) => prev + 1);
    }, 1000);
  };
  return (
    <div>
      <input type="button" onClick={countUp} value="Click" />
      <p>{num}</p>
    </div>
  );
}

export default App;
