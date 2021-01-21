import "../assets/css/Editing.css";

export function Editing(props) {
  return (<div id="editing">
    <div id="row-top">
      <p>Title</p>
      <textarea value={props.task.title}></textarea>
    </div>
    <div id="row-btm">
      <p>Content</p>
      <textarea value={props.task.content}></textarea>
    </div>
    <div className="control-bar">
      <button id="save">Save</button>
      <button id="cancel" onClick={props.cancelEdit}>Cancel</button>
    </div>
  </div>);
}
