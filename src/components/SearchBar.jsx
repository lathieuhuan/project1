import '../assets/css/SearchBar.css';

function SearchBar(props) {
  return <div id="search-bar">
    <div id="inner">
      <input
        type="text"
        placeholder="Enter a keyword..."
        className="border"
        id="search-box"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.search(e.target.value);
          }
        }} />
      <button className="fa fa-search border" id="search-btn"
        onClick={() => {
          props.search(document.getElementById("search-box").value);
        }}>
      </button>
    </div>
  </div>
}

export { SearchBar }