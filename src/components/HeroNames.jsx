import "../assets/css/HeroNames.css";

export function HeroNames(props) {
  return (
    <div className="dropdown heroes_dd">
      {props.heroes.map((name, i) => {
          return (
            <input key={i}
              type="button"
              name="owner"
              className={"hero_opt" + (i === props.heroI ? " current" : "")}
              onClick={(e) => {
                props.handleChange(e);
                props.toggleHeroesL();
              }}
              value={name}
            />
          );
      })}
    </div>
  );
}