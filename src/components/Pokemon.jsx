export function Pokemon(props) {
  return (
    <div className="pokemon-cont"
      draggable="true"
      onDragStart={(e) => {
      e.dataTransfer.setData('from', props.type)
      e.dataTransfer.setData('indx', props.indx)
    }}>
      <img src={props.avatar} alt={props.avatar}/>
    </div>
  )
}