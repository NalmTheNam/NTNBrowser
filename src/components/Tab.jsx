import * as React from "react";

// Import parser
import Parser from "html-react-parser";

export default function Tab(props) {
  const tabs = JSON.parse(localStorage.getItem("tabs"))
  const tab = tabs.find(t => t.id == props.tabID)
  let contents = "";

  if (tab) {
    Object.values(tab.contents).map(
      val => (contents += `<${val.type} type='${val.inputType}' placeholder='${val.placeholder}' style='${val.style}'>${val.content}</${val.type}>`)
    );
  }

  return contents != "" ? (
    <div>{Parser(contents)}</div>
  ) : (
    <p>ID {props.tabID} not found!</p>
  );
}
