import * as React from "react";

export default function Tabs() {
  return [
    {
      name: "Welcome",
      id: 1,
      contents: {
        1: {
          content: "Welcome to <span style='color: dodgerblue'>NTN</span>Browser!",
          type: "h1"
        },
        2: {
          content: "Click the '+' to make a new tab, and click the 'X' to close a tab.",
          type: "p"
        },
        3: {
          content: "Happy browsing!",
          type: "p"
        }
      },
      readOnly: true
    }
  ];
}
