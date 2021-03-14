import "../../assets/css/1024/Tile.css";

export function Tile(props) {
  const { tile } = props;
  let className = "g1024_tile val-" + tile.value;
  return (
    <div
      className={className + (props.movement || "") + (tile.type || "")}
      onAnimationEnd={() => {
        if (tile.type !== null) {
          props.nullifyType(props.index);
        }
      }}
    >
      {tile.value || ""}
    </div>
  );
}