import "../assets/css/GameCard.css";

export function GameCard(props) {
  return (
    <div className="game-card">
      <div className="img-sec center">
        <img src="" alt="not found"/>
      </div>
      <div className="info-sec">
        <h3>
          <a href={"/" + props.info.name.split(" ").join("")}>{props.info.name}</a>
        </h3>
        <p>Total Players: {props.info.totalPlayers}</p>
        <p>Category:</p>
      </div>
    </div>
  );
}