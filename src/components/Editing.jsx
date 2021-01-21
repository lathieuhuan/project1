import "../assets/css/Editing.css";
import React from 'react';

export class Editing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.task?.title,
      content: props.task?.content,
    };
  }
  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  changeContent = (e) => {
    this.setState({ content: e.target.value });
  }
  render() {
    let { title, content } = this.state,
      { task, saveEdit, exitEdit } = this.props;
    return (<div id="editing">
      <div id="row-top">
        <p>Title</p>
        <textarea id="title" value={title} onChange={this.changeTitle} />
      </div>
      <div id="row-btm">
        <p>Content</p>
        <textarea id="content" value={content} onChange={this.changeContent} />
      </div>
      <div className="control-bar">
        <button id="save" onClick={() => {
          saveEdit(task?.id, title, content);
        }}>
          Save
        </button>
        <button id="cancel" onClick={exitEdit}>Cancel</button>
      </div>
    </div>);
  } 
}
