import "../assets/css/GameCard.css";

export function GameCard(props) {
  const { gameName, totalPlayers } = props.info;
  return (
    <div className="game-card thinnest-border smaller-b-radius">
      <div className="img-sec flex-center">
        <img src="" alt="not found"/>
      </div>
      <div className="info-sec medium-padding">
        <h3>
          <a href={"/" + gameName.split(" ").join("_")}>{gameName}</a>
        </h3>
        <p>Total Players: {totalPlayers}</p>
        <p>Category:</p>
      </div>
    </div>
  );
}