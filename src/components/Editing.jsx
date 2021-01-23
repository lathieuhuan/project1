import "../assets/css/Editing.css";
import React from 'react';

function isGood(str) {
  if (str !== "" && str !== undefined && str !== null) {
    for (let char of str) {
      if (char !== " ") {
        return true;
      }
    }
  }
  return false;
}

export class Editing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.task?.title,
      content: props.task?.content,
      warning: null,
    };
  }
  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  changeContent = (e) => {
    this.setState({ content: e.target.value });
  }
  setWarning = (ele) => {
    this.setState({ warning: ele });
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
      {this.state.warning}
      <div className="control-bar">
        <button id="save" onClick={() => {
          if (!isGood(title) || !isGood(content)) {
            this.setWarning(
              <p className="warning">Please enter atleast one character.</p>
            )
          } else {
            saveEdit(task?.id, title, content);
          }
        }}>
          Save
        </button>
        <button id="cancel" onClick={exitEdit}>Cancel</button>
      </div>
    </div>);
  } 
}
