import React from 'react';

function Start(props) {
  return (
    <div id="start">
      {props.pokemon.map((val, i) => {
        return <img
          key={i}
          src={val}
          draggable="true"
          onDragStart={(ev) => props.drag(ev)}
          alt=""
        ></img>
      })}
    </div>
  )
}

export { Start }