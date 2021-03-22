import React from "react";

export class Effects extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editing: false,
      newEffect: null,
      editedKey: null,
    };
  }
  toggleEdit = (editedKey) => {
    let editing = editedKey === "New Effect" ? true : !this.state.editing,
      newEffect = editedKey === "Clear" ? null : this.state.newEffect;
    this.setState({ editing, newEffect, editedKey });
  }
  makeNewName = (e) => {
    this.setState({ newEffect: e.target.value });
  }
  render() {
    const { editing, newEffect, editedKey } = this.state,
      { effects } = this.props;
    let content = [];
    for (let key in effects) {
      content.push(
        <div key={key} className="flex-col">
          <div className="effect_name">
          {key === editedKey && editing
            ? <input
                type="text"
                className="regular-inp"
                value={newEffect || ""}
                placeholder={key}
                onChange={this.makeNewName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.props.submitEffectName(newEffect, key);
                    this.toggleEdit("Clear");
                  }
                }}
              />
            : <p>{key}</p>}
          {key === editedKey && editing
            ? <p className="fa fa-check-square"
                onClick={() => {
                  this.props.submitEffectName(newEffect, key);
                  this.toggleEdit("Clear");
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
            value={effects[key]}
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