export function Pokemon(props) {
  return (
    <img src={props.image} alt={props.image} draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData('from', props.type)
        e.dataTransfer.setData('indx', props.indx)
    }} />
  )
}