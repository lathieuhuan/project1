import "../assets/css/Shelf.css";
import React from "react";
import { Skills } from "./Skills";
import { Masteries } from "./Masteries";

export function Shelf(props) {
  return (
    <div id="shelf">
      <Skills
        skills={props.skills}
        setUI={props.setUI}
        tryDelete={props.tryDelete}
      />
      <div className="full-hor-line"></div>
      <Masteries
        masteries={props.masteries}
        setUI={props.setUI}
        tryDelete={props.tryDelete}
      />
    </div>
  );
}
