import "../assets/css/Home.css";

export function Home(props) {
  let { tasks, toggleEditing, tryDelete } = props;
  return (<div id="home">
    <button id="add" onClick={() => toggleEditing(tasks.length)}>Add</button>
    {tasks.map((task, i) => {
      return (<div key={task.id} className="note-paper">
        <div className="text-area">
          <h1>{task.title}</h1>
          <p>{task.content}</p>
        </div>
        <div className="control-bar">
          <button onClick={() => toggleEditing(i)}>
            Edit
          </button>
          <button onClick={() => tryDelete(task.id, i)}>Delete</button>
        </div>
      </div>);
    })}
  </div>);
}
