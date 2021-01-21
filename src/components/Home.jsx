import "../assets/css/Home.css";

export function Home(props) {
  return (<div id="home">
    {props.tasks.map((val, i) => {
      return (<div key={val.id} className="note-paper">
        <div className="text-area">
          <h1>{val.title}</h1>
          <p>{val.content}</p>
        </div>
        <div className="control-bar">
          <button onClick={() => props.toEditing(i)}>
            Edit
          </button>
          <button>Delete</button>
        </div>
      </div>);
    })}
  </div>);
}
