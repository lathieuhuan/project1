import { Pokemon } from './Pokemon'

export function Collection(props) {
  return (
    <div className="border collection-cont"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        props.move(e.dataTransfer.getData('from'), props.type, e.dataTransfer.getData('indx'))
      }}>
      {props.remain.map((val, indx) => {
        if (val != 0) return indx
        return -1
      })
        .filter(val => val !== -1)
        .map((val) => {
          return (
            <Pokemon {...props.pokemons[val]} key={val} indx={val} type={props.type} />
          )
        })}
    </div>
  )
}