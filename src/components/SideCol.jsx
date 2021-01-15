import "../assets/css/SideCol.css";
import { ImgPiece } from "./ImgPiece";

export function SideCol(props) {
  return <div className="side-col"
    onDragOver={e => e.preventDefault()}
    onDrop={e => {
      props.move(
        e.dataTransfer.getData('start'),
        e.dataTransfer.getData('pos'),
        props.id
      );
    }}>
      {props.imgIs.map((val, i) => {
        return <ImgPiece key={val} imgI={val} index={i} id={props.id}
          showHint={props.showHint} hiliPiece={props.hiliPiece}/>;
      })}
  </div>;
}