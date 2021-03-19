import "../assets/css/Embryo.css";

export function Embryo(props) {
  const { skill, handleChange } = props,
    active = skill.type.substr(0, 3) === "Chủ";
  let effects = [];
  for (let key in skill.effects) {
    effects.push(
      <div key={key} className="flex-col">
        <div className="effect_name">
          <p>{key}</p>
          <p
            className="fa fa-minus-square"
            onClick={() => props.deleteEffect(key)}
          ></p>
        </div>
        <textarea
          type="text"
          name={key}
          className="effect_desc"
          value={skill.effects[key]}
          spellCheck={false}
          onChange={props.changeEffect}
        />
      </div>
    );
  }
  return (
    <div id="embryo">
      <input
        type="text"
        name="name"
        className={active ? "active" : "passive"}
        id="eb_name"
        value={skill.name}
        onChange={handleChange}
      />
      <div>
        <div className="eb_line">
          <p className="eb_left">Skill slot: </p>
          <input
            type="text"
            name="slot"
            className="shrink"
            value={skill.slot}
            onChange={handleChange}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Categories: </p>
          <input
            className="grow"
            value={skill.categories.join(", ")}
            onChange={props.changeCategories}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Hero: </p>
          <input
            type="text"
            name="owner"
            className="grow"
            value={skill.owner}
            onChange={handleChange}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Type: </p>
          <input
            type="text"
            name="type"
            className="grow"
            value={skill.type}
            onChange={handleChange}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Description: </p>
          <textarea
            type="text"
            name="desc"
            className="grow"
            id="eb_desc"
            value={skill.desc}
            spellCheck={false}
            onChange={handleChange}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Effects:</p>
          <div className="grow">
            {effects}
            <p className="fa fa-plus-square"></p>
          </div>
        </div>
        {active ? (
          <div className="flex-col">
            <div className="eb_line">
              <p className="eb_left">AP:</p>
              <input
                type="text"
                name="AP"
                className="shrink"
                value={skill.AP}
                onChange={handleChange}
              />
            </div>
            <div className="eb_line">
              <p className="eb_left">Mana cost:</p>
              <input
                type="text"
                name="manaCost"
                className="shrink"
                value={skill.manaCost}
                onChange={handleChange}
              />
            </div>
            <div className="eb_line">
              <p className="eb_left">Cooldown:</p>
              <input
                type="text"
                name="cooldown"
                className="shrink"
                value={skill.cooldown}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}