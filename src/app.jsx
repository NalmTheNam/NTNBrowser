import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Misc
import Parser from "html-react-parser";
import Tab from "./components/Tab.jsx";
import Tabs from "./tabs.jsx";
import OpenableTabs from "./openableTabs.jsx";

// Import style
import "./styles/styles.css";

export default function App() {
  function updateLocalStorage(c1, c2, c3) {
    if (!localStorage.getItem("firstVisit")) {
      localStorage.setItem("activeTab", 1);
      localStorage.setItem("length of tabs", Tabs().length);
      localStorage.setItem("tabs", JSON.stringify(Tabs()));
      localStorage.setItem("firstVisit", true);
    } else {
      localStorage.setItem("activeTab", c1);
      localStorage.setItem("length of tabs", c2);
      localStorage.setItem("tabs", JSON.parse(JSON.stringify(c3)));
    }
  }
  updateLocalStorage(
    localStorage.getItem("activeTab"),
    localStorage.getItem("length of tabs"),
    localStorage.getItem("tabs")
  );

  const [rerender, setRerender] = useState(false);
  const [tabs, updateTabs] = useState(JSON.parse(localStorage.getItem("tabs")));
  const [activeTab, changeTab] = useState(localStorage.getItem("activeTab"));
  const [darkMode, setDarkMode] = useState(false);

  function closeTab(id) {
    updateTabs(prevData => {
      const newData = [...prevData];
      return newData.filter(tab => tab.id !== id);
    });
  }

  function newTab(object) {
    updateTabs(prevData => {
      return [...prevData, ...object];
    });
  }

  function newSearch() {
    newTab([
      {
        name: "Search",
        id: tabs.length + 1,
        contents: {
          1: {
            content: "<span style='color: dodgerblue'>NTN</span>Search",
            type: "h1"
          },
          2: {
            content: "",
            type: "input",
            inputType: "text",
            placeholder: "Search..."
          }
        }
      }
    ]);
  }

  useEffect(() => {
    updateLocalStorage(activeTab, tabs.length, JSON.stringify(tabs));
    setRerender(!rerender);
  }, [activeTab, tabs]);

  return (
    <div
      /* style={{
        backgroundColor: darkMode ? "#202124" : "white",
        color: darkMode ? "#bdc1c6" : "black"
      }} */
    >
      <input type="text" class="search" />
      <div className="tabBar">
        {tabs.map((tab, index) => {
          return (
            <button
              key={tab.id}
              style={{
                backgroundColor:
                  activeTab == tab.id ? "dodgerblue" : "turquoise"
              }}
              onClick={() => changeTab(tab.id)}
            >
              <p>
                {tab.name}{" "}
                <button
                  className="close"
                  onClick={e => {
                    closeTab(tab.id);
                    e.stopPropagation();
                  }}
                >
                  X
                </button>
              </p>
            </button>
          );
        })}
        <button
          className="transparent"
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          Reset
        </button>
        <button className="transparent" onClick={newSearch}>
          +
        </button>
      </div>
      <button
        className="fixed center dark"
        disabled
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Disable" : "Enable"} dark mode (button disabled)
      </button>
      <br />
      <br />
      <hr />
      <Tab tabID={activeTab} />
    </div>
  );
}
