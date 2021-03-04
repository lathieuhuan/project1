import "../../assets/css/2048/Tile.css";

export function Tile(props) {
  const { tile } = props;
  let className = "g2048_tile val-" + tile.value;
  return (
    <div className={className + (tile.move || "")}>
      {tile.value || ""}
    </div>
  );
}