
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
            <p className="kc_line"><b>Hero:</b> {mastery.owner}</p>
            <p className="kc_line"><b>Description:</b> {mastery.desc}</p>
            {effects}
          </div>
        );
      })}
    </div>
  );
}