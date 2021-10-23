import "../assets/css/Cell.css";
import { ImgPiece } from "./ImgPiece";

export function Cell(props) {
  return (
    <div
      className={"cell" + (props.hiliPiece === props.index ? " requested" : "")}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        props.move(
          e.dataTransfer.getData("start"),
          e.dataTransfer.getData("pos"),
          props.index
        );
      }}
      onDoubleClick={() => props.showHint(props.index)}
    >
      {!props.imgI ? null : <ImgPiece imgI={props.imgI} id={props.index} />}
    </div>
  );
}
