import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Misc
import Parser from "html-react-parser";
import Tab from "./components/Tab.jsx";
import Tabs from "./tabs.jsx";

// Import style
import "./styles/styles.css";

export default function App() {
  function updateLocalStorage(c1, c2) {
    if (!localStorage.getItem("firstVisit")) {
      localStorage.setItem("activeTab", "Welcome page");
      localStorage.setItem("tabs", JSON.stringify(Tabs()));
      localStorage.setItem("firstVisit", true);
    } else {
      localStorage.setItem("tabs", JSON.parse(JSON.stringify(c1)));
      localStorage.setItem("activeTab", c2);
    }
  }
  updateLocalStorage(
    localStorage.getItem("tabs"),
    localStorage.getItem("activeTab")
  );

  const [rerender, setRerender] = useState(false);
  const [tabs, updateTabs] = useState(JSON.parse(localStorage.getItem("tabs")));
  const [activeTab, changeTab] = useState(localStorage.getItem("activeTab"));
  const [darkMode, setDarkMode] = useState(false);

  function closeTab(name) {
    updateTabs(prevData => {
      const newData = { ...prevData };
      delete newData[name];
      return newData;
    });
  }

  function newTab(object) {
    updateTabs(prevData => {
      const newData = { ...prevData, ...object };
      return newData;
    });
  }

  function newSearch() {
    newTab({
      "Search": {
        contents: {
          1: {
            content: "<span style='color: dodgerblue'>NTN</span>Search",
            type: "h1",
            inputType: "none",
            placeholder: "none"
          },
          2: {
            content: "",
            type: "input",
            inputType: "text",
            placeholder: "Search..."
          }
        }
      }
    });
  }

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    updateLocalStorage(JSON.stringify(tabs), activeTab);
    setRerender(!rerender);
  }, [activeTab, tabs]);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#202124" : "white",
        color: darkMode ? "#bdc1c6" : "black"
      }}
    >
      <div className="tabBar">
        {Object.keys(tabs).map(tab => {
          return (
            <button
              key={tab}
              style={{
                backgroundColor: activeTab == tab ? "dodgerblue" : "turquoise"
              }}
              onClick={() => changeTab(tab)}
            >
              <p>
                {tab}{" "}
                <button
                  className="close"
                  onClick={() => closeTab(tab)}
                  onMouseDown={handleClick}
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
        <button
          className="transparent"
          onClick={newSearch}
        >
          +
        </button>
      </div>
      <button
        className="fixed center dark"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Disable" : "Enable"} dark mode
      </button>
      <br></br>
      <br></br>
      <hr></hr>
      <Tab tab={activeTab}></Tab>
    </div>
  );
}
