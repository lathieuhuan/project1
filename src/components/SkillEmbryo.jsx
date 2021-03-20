import "../assets/css/Embryo.css";
import { Effects } from "./Effects";

export function SkillEmbryo(props) {
  const { skill, handleChange } = props,
    active = skill.type?.substr(0, 3) === "Chủ";
  return (
    <div id="embryo">
      <input
        type="text"
        name="name"
        className={active ? "active" : "passive"}
        id="eb_name"
        value={skill.name || ""}
        onChange={handleChange}
      />
      {props.nameExisted ? <p className="warning">Name existed!</p> : null}
      <div>
        <div className="eb_line">
          <p className="eb_left">Skill slot: </p>
          <input
            type="text"
            name="slot"
            className="shrink"
            value={skill.slot || ""}
            onChange={handleChange}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Categories: </p>
          <input
            type="text"
            name="categories"
            className="grow"
            value={skill.categories?.join(", ") || ""}
            spellCheck={false}
            onChange={(e) => handleChange(e, "c")}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Hero: </p>
          <input
            type="text"
            name="owner"
            className="grow"
            value={skill.owner || ""}
            onChange={handleChange}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Type: </p>
          <select
            name="type"
            className="grow"
            defaultValue={skill.type || "Bị động"}
            onChange={handleChange}
          >
            <option value="Bị động">Bị động</option>
            <option value="Chủ động - Không mục tiêu">
              Chủ động - Không mục tiêu
            </option>
            <option value="Chủ động - Mục tiêu ô">Chủ động - Mục tiêu ô</option>
            <option value="Chủ động - Mục tiêu quân cờ">
              Chủ động - Mục tiêu quân cờ
            </option>
            <option value="Chủ động - Mục tiêu vùng">
              Chủ động - Mục tiêu vùng
            </option>
          </select>
        </div>
        <div className="eb_line">
          <p className="eb_left">Description: </p>
          <textarea
            type="text"
            name="desc"
            className="grow"
            id="eb_desc"
            value={skill.desc || ""}
            spellCheck={false}
            onChange={handleChange}
          />
        </div>
        <Effects
          effects={skill.effects || ""}
          handleChange={handleChange}
          submitEffectName={props.submitEffectName}
          deleteEffect={props.deleteEffect}
          addEffect={props.addEffect}
        />
        {active ? (
          <div className="flex-col">
            <div className="eb_line">
              <p className="eb_left">AP:</p>
              <input
                type="text"
                name="AP"
                className="shrink"
                value={skill.AP || ""}
                onChange={handleChange}
              />
            </div>
            <div className="eb_line">
              <p className="eb_left">Mana cost:</p>
              <input
                type="text"
                name="manaCost"
                className="shrink"
                value={skill.manaCost || ""}
                onChange={handleChange}
              />
            </div>
            <div className="eb_line">
              <p className="eb_left">Cooldown:</p>
              <input
                type="text"
                name="cooldown"
                className="shrink"
                value={skill.cooldown || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}