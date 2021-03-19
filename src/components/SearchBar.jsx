import "../assets/css/SearchBar.css";
import React from "react";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchType: "skills & masteries by hero", searchTerms: "" };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { searchType, searchTerms } = this.state;
    return (
      <div id="search-bar">
        <button id="add-btn">Add Skill / Masteries</button>
        <div id="sb_inner">
          <p>SEARCH</p>
          <select
            name="searchType"
            defaultValue="skills by hero"
            onChange={this.handleChange}
          >
            <option value="skills &amp; masteries by hero">
              skills &amp; masteries by hero
            </option>
            <option value="skills by category">skills by category</option>
            <option value="masteries by category">masteries by category</option>
          </select>
          <input
            type="text"
            placeholder={"Enter " + (searchType === "skills & masteries by hero"
              ? "the hero name" : "the categories")}
            name="searchTerms"
            value={searchTerms}
            onChange={this.handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerms.match(/([a-zA-Z0-9])+([ -~])*/)) {
                this.props.search(searchType, searchTerms);
              }
            }}
          />
          <div
            className="flex-center"
            id="search-btn"
            onClick={() => {
              if (searchTerms.match(/([a-zA-Z0-9])+([ -~])*/)) {
                this.props.search(searchType, searchTerms);
              }
            }}
          >
            <img
              id="search-icon"
              src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
              alt="search"
            />
          </div>
        </div>
      </div>
    );
  }
}