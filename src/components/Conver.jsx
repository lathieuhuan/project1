import "../assets/css/Conver.css";

export function Conver(props) {
  return (
    <div className={"flex narrow-padding pointer conver" + (props.isChosen ? " chosenConver" : "")}
      onClick={props.choose}
    >
      <img className="avatar" src={props.avatar} alt=""/>
      <p>{props.name}</p>
    </div>
  );
}