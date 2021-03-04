import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.css";

if (!window.META_DATA) {
  // if not from server
  window.META_DATA = {
    name: "Silver Raptor 125",
    description: "The 125th Silver Raptor",
    external_url: "https://raptor.pizza/silver-raptors/125",
    image: "ipfs://QmYqPSXpWdZuLHUBZn22JizV88vzDmEJyLg4sdCd6Dy4de",
    animation_url:
      "ipfs://QmT729X131cHpsbxyQy9BkrTebcTPajjFevDbk4UXc3YBR?filename=silver_raptor.glb",
    attributes: [{ display_type: "number", trait_type: "Gen", value: 1 }],
  };
}
render(
  <App metadata={window.META_DATA} window={window} />,
  document.querySelector("#root")
);
