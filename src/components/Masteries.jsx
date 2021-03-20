
export function Masteries(props) {
  return (
    <div className="shelf_container">
      {props.masteries?.map((mastery, i) => {
        let effects = [];
        for (let key in mastery.effects) {
          effects.push(
            <p key={key} className="kc_line indent-15">
              <b>{key}</b> - {mastery.effects[key]}
            </p>
          );
        }
        return (
          <div key={i} className="kit-card">
            <span
              className="fa fa-edit"
              onClick={() => props.setUI("editing", "mastery", i)}
            ></span>
            <span
              className="fa fa-trash"
              onClick={() => props.tryDelete("mastery", i)}
            ></span>
            <h1 className="kc_heading">
              <span className="mastery"
              >{mastery.name}</span> <sup>(Mastery {mastery.slot})</sup>
            </h1>
            <p className="kc_subheading">
              <i><span className="red">Categories:</span> {
                mastery.categories?.join(", ")
              }</i>
            </p>
            <p className="kc_line"><b>Hero:</b> {mastery.owner}</p>
            <p className="kc_line"><b>Description:</b> {mastery.desc}</p>
            {effects}
          </div>
        );
      })}
    </div>
  );
}