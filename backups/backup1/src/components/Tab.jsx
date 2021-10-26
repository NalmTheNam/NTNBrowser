import * as React from "react";

// Import parser
import Parser from "html-react-parser";

export default function Tab(props) {
  const tab = props.tab;
  const tabs = JSON.parse(localStorage.getItem("tabs"))
  let contents = "";

  if (tabs[tab]) {
    Object.values(tabs[tab].contents).map(
      val => (contents += `<${val.type} type='${val.inputType}' placeholder='${val.placeholder}' style='${val.style}'>${val.content}</${val.type}>`)
    );
  }

  return contents != "" ? (
    <div>{Parser(contents)}</div>
  ) : (
    <p>Tab "{tab}" does not exist!</p>
  );
}
