import '../assets/css/SearchBox.css';

function SearchBox(props) {
  return <input
    type="text"
    placeholder="Enter a keyword..."
    id="search-box"
    onInput={props.changeInput}
></input>
}

export { SearchBox }