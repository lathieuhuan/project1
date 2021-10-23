import "../assets/css/HeroNames.css";

export function HeroNames(props) {
  return (
    <div className="dropdown heroes_dd">
      {props.heroes.map((name, i) => (
        <input key={i}
          type="button"
          name="owner"
          className={"hero_opt" + (i === props.heroI ? " current" : "")}
          onClick={(e) => {
            props.search(e.target.value);
            props.closeHeroesL();
          }}
          value={name}
        />
      ))}
    </div>
  );
}