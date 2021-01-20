import "../assets/css/Home.css";

export function Home(props) {
  return (<div id="home">
    {props.tasks.map((val) => {
      return (<div key={val.id} className="note-paper">
        <h1>{val.title}</h1>
        <p>{val.content}</p>
      </div>);
    })}
  </div>);
}
