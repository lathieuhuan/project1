import "../assets/css/Conver.css";

export function Conver(props) {
  return (
    <div className={"flex narrow-padding pointer" + (props.isChosen ? " chosen-conver" : " conver")}
      onClick={props.choose}
    >
      <img className="avatar" src={props.frInfo.avatar} alt=""/>
      <p>{props.frInfo.username}</p>
    </div>
  );
}