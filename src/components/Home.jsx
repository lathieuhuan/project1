import "../assets/css/Home.css";
import { deleteTask } from "../ultis/ultis";

export function Home(props) {
  let { tasks, toEditing, update } = props;
  return (<div id="home">
    <button id="add" onClick={() => toEditing(tasks.length)}>Add</button>
    {tasks.map((val, i) => {
      return (<div key={val.id} className="note-paper">
        <div className="text-area">
          <h1>{val.title}</h1>
          <p>{val.content}</p>
        </div>
        <div className="control-bar">
          <button onClick={() => toEditing(i)}>
            Edit
          </button>
          <button onClick={() => {
            deleteTask(val.id).then(update);
          }}>
            Delete
          </button>
        </div>
      </div>);
    })}
  </div>);
}
