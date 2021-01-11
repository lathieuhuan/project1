import { Pokemon } from './Pokemon'

export function Section(props) {
  return (
    <div className="section-cont">
      <div className={` type-cont ${props.type}`}>
        <p>{props.type || 'Fire'}</p>
        </div>
        <div className="pokemons-cont"
          onDrop={(e) => {
          props.move(e.dataTransfer.getData('from'), props.type, e.dataTransfer.getData('indx'))
        }}
          onDragOver={(e) => {
            e.preventDefault()
          }}>
        {props[props.type].map((val, indx) => {
            if (val != 0) return indx
            return -1;})
          .filter(val => val !== -1)
          .map((val) => {
            return (
              <Pokemon {...props.pokemons[val]} indx={val} key={val} type={props.type} />
            )
          })}
      </div>
    </div>
  )
}