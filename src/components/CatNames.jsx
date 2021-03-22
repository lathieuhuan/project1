import "../assets/css/CatNames.css";

export function CatNames(props) {
  return !props.cats.length ? null : (
    <div className="dropdown cats_dd">
      {props.cats.map((cat, i) => {
        return (
          <input
            key={i}
            type="button"
            className="cat_opt"
            value={cat}
            onClick={props.addCat}
          />
        );
      })}
    </div>
  );
}