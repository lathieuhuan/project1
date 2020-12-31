import "./App.css";
import { Card } from "./components/Card";

function App() {
  let cardNo = [0, 1, 2, 3, 4];
  let shuffled = [];
  while (cardNo.length > 0) {
    let random = Math.floor(Math.random() * cardNo.length);
    if (shuffled.indexOf(cardNo[random]) === -1) {
      shuffled.push(cardNo[random]);
    } else if (
      cardNo.length === 1 ||
      (shuffled.indexOf(cardNo[random]) !== -1 &&
        cardNo[random] !== shuffled[shuffled.length - 1])
    ) {
      shuffled.push(cardNo[random]);
      cardNo.splice(random, 1);
    }
  }
  let cards = [];
  let imgs = [
    "club8.jpg",
    "diamond6.jpg",
    "heart2.jpg",
    "spade5.jpg",
    "heart10.jpg",
  ];
  for (let i in shuffled) {
    cards.push(
      <Card key={i} cardNo={shuffled[i]} id={i} img={imgs[shuffled[i]]} />
    );
  }
  return <div id="playground">{cards}</div>;
}

export default App;
