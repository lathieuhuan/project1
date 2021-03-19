import { SearchBar } from "./SearchBar";
import { SkillsList } from "./SkillsList"

export function Shelf(props) {
  return (
    <div>
      <SearchBar search={props.search} />
      <SkillsList skills={props.skills} setUI={props.setUI} />
    </div>
  );
}