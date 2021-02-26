import "../assets/css/GameDisplayers.css";

export function GameCard(props) {
  const { gameTitle, totalPlayers, image } = props.info,
    redirect = () => {
      window.location.assign("/" + gameTitle.split(" ").join("_"));
    }
  return (
    <div className="game-card border-1 radius-5">
      <div className="img-sec">
        <img
          className="parent-size pointer"
          src={image} alt="not found"
          onClick={redirect}
        />
      </div>
      <div className="flex-col padding-10">
        <p className="gc_heading" onClick={redirect}>{gameTitle}</p>
        <p className="gc_line">Total Players: {
          totalPlayers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }</p>
        <p className="gc_line">Category:</p>
      </div>
    </div>
  );
}

export function GameTitle(props) {
  const redirect = () => {
    window.location.assign("/" + info.gameTitle.split(" ").join("_"));
  }
  const { info, rank } = props;
  return (
    <div className="game-title flex">
      <p
        className={"rank-num " + (rank <= 3 ? "top-3" : "top-5")}
        onClick={redirect}
      >
        {rank}
      </p>
      <div>
        <h4 className="gt_heading" onClick={redirect}>{info.gameTitle}</h4>
        <p className="gt_line">{
          info.totalPlayers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        } total players</p>
      </div>
    </div>
  );
}