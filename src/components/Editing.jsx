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
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }
  trySave = () => {
    const { title, content } = this.state;
    if (!isGood(title) || !isGood(content)) {
      this.setState({
        warning: <p className="warning">Please enter atleast one character.</p>
      });
    } else {
      this.props.saveEdit(this.props.task?.id, title, content);
    }
  }
  render() {
    const { title, content } = this.state;
    return (
      <div id="editing">
        <div id="row-top">
          <p>Title</p>
          <textarea
            id="title"
            name="title"
            value={title}
            onChange={this.handleChange} />
        </div>
        <div id="row-btm">
          <p>Content</p>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={this.handleChange} />
        </div>
        {this.state.warning}
        <div className="control-bar">
          <button id="save" onClick={this.trySave}>Save</button>
          <button id="cancel" onClick={this.props.toggleEditing}>Cancel</button>
        </div>
      </div>
    );
  } 
}
