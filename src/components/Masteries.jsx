
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
            <div className="kc_heading">
              <h1 className="kc_name mastery">{mastery.name}</h1>
              <p className="kc_slot">(Skill {mastery.slot})</p>
            </div>
            <div className="kc_subheading" id="kc_cats">
              <p id="cat_desc">Categories:</p>
              {mastery.categories?.map((cat, i) => {
                return (
                  <p key={i}
                    className="kc_cat"
                    onClick={() => props.search("masteries by category", cat)}
                  >
                    {cat}
                  </p>
                );
              })}
            </div>
            <p className="kc_line"><b>Hero:</b> <span className="kc-owner" onClick={() => 
              props.search("skills & masteries by hero", mastery.owner)}
            >
              {mastery.owner}</span></p>
            <p className="kc_line"><b>Description:</b> {mastery.desc}</p>
            {effects}
          </div>
        );
      })}
    </div>
  );
}