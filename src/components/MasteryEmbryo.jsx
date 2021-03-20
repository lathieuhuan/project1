import "../assets/css/Embryo.css";
import { Effects } from "./Effects";

export function MasteryEmbryo(props) {
  const { mastery, handleChange } = props;
  return (
    <div id="embryo">
      <input
        type="text"
        name="name"
        className="mastery"
        id="eb_name"
        value={mastery.name || ""}
        onChange={handleChange}
      />
      {props.nameExisted ? <p className="warning">
        <span className="fa fa-exclamation-circle">
        </span> Name existed! <span className="fa fa-exclamation-circle">
        </span></p> : null}
      <div>
        <div className="eb_line">
          <p className="eb_left">Mastery slot: </p>
          <input
            type="text"
            name="slot"
            className="shrink"
            value={mastery.slot || ""}
            onChange={handleChange}
          />
        </div>
        <div className="eb_line">
          <p className="eb_left">Categories: </p>
          <input
            type="text"
            name="categories"
            className="grow"
            value={mastery.categories?.join(", ") || ""}
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
            value={mastery.owner || ""}
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
            value={mastery.desc || ""}
            spellCheck={false}
            onChange={handleChange}
          />
        </div>
        <Effects
          effects={mastery.effects || ""}
          handleChange={handleChange}
          submitEffectName={props.submitEffectName}
          deleteEffect={props.deleteEffect}
          addEffect={props.addEffect}
        />
      </div>
    </div>
  );
}