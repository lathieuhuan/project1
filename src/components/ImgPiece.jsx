import "../assets/css/ImgPiece.css";

export function ImgPiece(props) {
  return <img className="img-piece"
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