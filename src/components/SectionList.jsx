import React from 'react';

function End(props) {
  return (
    <div id="end">
      <div onDragOver={(ev) => props.allowDrop(ev)} onDrop={(ev) => props.drop(ev)}>
        <h2 id="fire">FIRE</h2>
      </div>
      <div onDragOver={(ev) => props.allowDrop(ev)} onDrop={(ev) => props.drop(ev)}>
        <h2 id="water">WATER</h2>
      </div>
      <div onDragOver={(ev) => props.allowDrop(ev)} onDrop={(ev) => props.drop(ev)}>
        <h2 id="grass">GRASS</h2>
      </div>
    </div>
  );
}

export { End }