
export function Skills(props) {
  return (
    <div className="shelf_container">
      {props.skills?.map((skill, i) => {
        const type = skill.type.substr(0,2) === "Bị" ? "passive" : "active";
        let effects = [];
        for (let key in skill.effects) {
          effects.push(
            <p key={key} className="kc_line indent-15">
              <b>{key}</b> - {skill.effects[key]}
            </p>
          );
        }
        return (
          <div key={i} className="kit-card">
            <span
              className="fa fa-edit"
              onClick={() => props.setUI("editing", "skill", i)}
            ></span>
            <span
              className="fa fa-trash"
              onClick={() => props.tryDelete("skill", i)}
            ></span>
            <h1 className="kc_heading">
              <span className={type}
              >{skill.name}</span> <sup>(Skill {skill.slot})</sup>
            </h1>
            <p className="kc_subheading">
              <i><span className="red">Categories:</span> {
                skill.categories?.join(", ")
              }</i>
            </p>
            <p className="kc_line"><b>Hero:</b> {skill.owner}</p>
            <p className="kc_line"><b>Type:</b> {skill.type}</p>
            <p className="kc_line"><b>Description:</b> {skill.desc}</p>
            {effects}
            {type === "active" ? (
              <div className="kc_line flex">
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