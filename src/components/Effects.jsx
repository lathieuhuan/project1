import React from "react";

export class Effects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editing: false,
      newEffect: null,
      currentKey: null,
    };
  }
  toggleEdit = (newEffect) => {
    let editing = newEffect === "New Effect" ? true : !this.state.editing;
    this.setState({ editing, newEffect, currentKey: newEffect });
  }
  makeNewName = (e) => {
    this.setState({ newEffect: e.target.value });
  }
  render() {
    const { editing, newEffect, currentKey } = this.state,
      { effects } = this.props;
    let content = [];
    for (let key in effects) {
      content.push(
        <div key={key} className="flex-col">
          <div className="effect_name">
          {key === currentKey && editing
            ? <input
                type="text"
                value={newEffect}
                onChange={this.makeNewName}/>
            : <p>{key}</p>}
          {key === currentKey && editing
            ? <p className="fa fa-check-square"
                onClick={() => {
                  this.props.submitEffectName(newEffect, key);
                  this.toggleEdit();
                }}></p>
            : <p className="fa fa-pencil-square"
                onClick={() => this.toggleEdit(key)}></p>}
          <p className="fa fa-minus-square"
            onClick={() => this.props.deleteEffect(key)}
          ></p>
          </div>
          <textarea
            type="text"
            name={key}
            className="effect_desc"
            value={this.props.effects[key]}
            spellCheck={false}
            onChange={(e) => this.props.handleChange(e, "e")}
          />
        </div>
      );
    }
    return (
      <div className="eb_line">
        <p className="eb_left">Effects:</p>
        <div className="grow">
          {content}
          <p
            className="fa fa-plus-square"
            onClick={() => {
              this.props.addEffect();
              this.toggleEdit("New Effect");
            }}
          ></p>
        </div>
      </div>
    );
  }
}