import "../assets/css/SkillsList.css";
import React from "react";

export function SkillsList(props) {
  return (
    <div id="skill-list">
      {props.skills.map((skill, i) => {
        const type = skill.type.substr(0,2) === "Bị" ? "passive" : "active";
        let effects = [];
        for (let key in skill.effects) {
          effects.push(
            <p key={key} className="sc_line indent-15">
              <b>{key}</b> - {skill.effects[key]}
            </p>
          );
        }
        return (
          <div key={i} className="skill-card">
            <span
              className="fa fa-edit"
              onClick={() => props.setUI("editing", i)}
            ></span>
            <h1 className="sc_heading">
              <span className={type}
              >{skill.name}</span> <sup>(Skill {skill.slot})</sup>
            </h1>
            <p className="sc_subheading">
              <i><span className="red">Categories:</span> {
                skill.categories.join(", ")
              }</i>
            </p>
            <p className="sc_line"><b>Hero:</b> {skill.owner}</p>
            <p className="sc_line"><b>Type:</b> {skill.type}</p>
            <p className="sc_line"><b>Description:</b> {skill.desc}</p>
            {effects}
            {type === "active" ? (
              <div className="sc_line flex">
                <p className="mgright-5"><b>AP:</b> {skill.AP} |</p>
                <p className="mgright-5">
                  <b>Mana cost:</b> {skill.manaCost} |
                </p>
                <p><b>Cooldown:</b> {skill.cooldown}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
