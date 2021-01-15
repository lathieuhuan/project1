import "../assets/css/ImgPiece.css";

export function ImgPiece(props) {
  let boxShadow = "";
  if ( props.imgI !== props.hiliPiece + 1 &&
    (props.id === "leftCol" || props.id === "rightCol") ) {
      boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)";
  } else if (props.imgI === props.hiliPiece + 1) {
    boxShadow = "0 5px 10px rgba(255, 0, 0, 0.8), 0 8px 20px rgba(255, 0, 0, 0.7)";
  }
  return <img className="img-piece"
    style={{boxShadow: boxShadow}}
    src={"/images/part_" + props.imgI + ".jpg"}
    draggable="true"
    onDragStart={e => {
      e.dataTransfer.setData("start", props.id);
      e.dataTransfer.setData("pos", props.index);
    }}
    onClick={e => {
      document.getElementById("modal").style.display = "flex";
      document.getElementById("modal-img").src = e.target.src;
    }}
    alt="piece"
  />
}