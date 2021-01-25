import "../assets/css/GameCard.css";

export function GameCard(props) {
  const { name, totalPlayers } = props.info;
  return (
    <div className="game-card">
      <div className="img-sec center">
        <img src="" alt="not found"/>
      </div>
      <div className="info-sec">
        <h3>
          <a href={"/" + name.split(" ").join("_")}>{name}</a>
        </h3>
        <p>Total Players: {totalPlayers}</p>
        <p>Category:</p>
      </div>
    </div>
  );
}