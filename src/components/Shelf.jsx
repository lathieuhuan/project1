import "../assets/css/Shelf.css";
import React from "react";
import { Skills } from "./Skills";
import { Masteries } from "./Masteries";

export function Shelf(props) {
  return (
    <div id="shelf">
      {!props.skills.length ? null : 
        <Skills
          skills={props.skills}
          setUI={props.setUI}
          tryDelete={props.tryDelete}
          search={props.search}
        />}
      {!props.masteries.length ? null :
        <Masteries
          masteries={props.masteries}
          setUI={props.setUI}
          tryDelete={props.tryDelete}
          search={props.search}
        />}      
    </div>
  );
}
