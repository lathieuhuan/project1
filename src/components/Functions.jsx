
function divideShuffle(total) {
  let arr = [], result = [[], []];
  for (let i = 1; i <= total; i++) {
    arr.push(i);
  }
  for (let i = 0; i < total / 2; i++) {
    for (let j = 0; j < 2; j++) {
      let random = Math.floor(Math.random() * arr.length);
      result[j].push(arr.splice(random, 1)[0]);
    }
  }
  return result;
}

function SideCol(props) {
  return <div className="side-col" id={props.id}
    onDragOver={e => e.preventDefault()}
    onDrop={e => {
      props.move(
        e.dataTransfer.getData('start'),
        e.dataTransfer.getData('pos'),
        props.id
      );
    }}>
      {props.imgIs.map((val, i) => {
        return <ImgPiece key={val} imgI={val} index={i} id={props.id}/>;
      })}
  </div>;
}

function Cell(props) {
  return <div className="cell"
    onDragOver={e => e.preventDefault()}
    onDrop={e => {
      props.move(
        e.dataTransfer.getData('start'),
        e.dataTransfer.getData('pos'),
        props.index
      );
    }}>
      {!props.imgI ? null :
        <img src={"/images/part_" + props.imgI + ".jpg"} alt="error" /> }
  </div>;
}

function ImgPiece(props) {
  return <img
    src={"/images/part_" + props.imgI + ".jpg"}
    draggable="true"
    onDragStart={e => {
      e.dataTransfer.setData("start", props.id);
      e.dataTransfer.setData("pos", props.index);
    }}
    alt="pieces"
  />
}

export { divideShuffle, SideCol, Cell }