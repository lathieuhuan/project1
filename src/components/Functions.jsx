import "../assets/css/Functions.css";

function FilterCol(props) {
  return (
    <div className="filter-col">
      <h2 id={props.id+"-h"}>{props.id}</h2>
      <PokemonList data={props.data} id={props.id} move={props.move} />
    </div>
  );
}

function PokemonList(props) {
  let { data, id, move } = props
  return (
    <div className="list-container" id={id}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        move(e.dataTransfer.getData('start'), e.dataTransfer.getData('pos'), id);
      }}>
      {data.map((val, i) => {
        return <img key={i} src={val.image} draggable="true"
          onDragStart={e => {
            e.dataTransfer.setData('start', id)
            e.dataTransfer.setData('pos', i)
          }}
          alt="pokemon-img"/>;
      })}
    </div>
  )
}

export { FilterCol, PokemonList }