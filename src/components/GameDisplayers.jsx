import "../assets/css/GameDisplayers.css";

export function GameCard(props) {
  const { gameTitle, totalPlayers } = props.info;
  return (
    <div className="game-card thinnest-border smaller-b-radius">
      <div className="img-sec flex-center">
        <img src="" alt="not found"/>
      </div>
      <div className="info-sec medium-padding">
        <a href={"/" + gameTitle.split(" ").join("_")}>
          <h3>{gameTitle}</h3>
        </a>
        <p>Total Players: {
          totalPlayers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }</p>
        <p>Category:</p>
      </div>
    </div>
  );
}

export function GameTitle(props) {
  const { info, rank } = props;
  return (
    <div className="game-title flex">
      <p className={rank <= 3 ? "top-3" : "top-10"}>{rank}</p>
      <div>
        <h4>{info.gameTitle}</h4>
        <p className="num">{
          info.totalPlayers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } total players</p>
      </div>
    </div>
  );
}