// import "core-js/stable";
// import "regenerator-runtime/runtime";
import * as functions from "firebase-functions";
import fetch from "isomorphic-fetch";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./src/App";
import express from "express";
import fs from "fs";
import Web3 from "web3";
import SilverRaptor from "./src/SilverRaptor";

const index = fs.readFileSync(__dirname + "/index.html", "utf8");

const app = express();
const MAINNET_ADDRESS = "0x525aA007d06c40bCb2Ce4cDa06AC559768E6A327";
const silverRaptorAbi = require(__dirname + "/contracts/SilverRaptor.json").abi;
const web3 = new Web3(
  "https://mainnet.infura.io/v3/e835057bad674697959be47dcac5028e"
);
const contract = new web3.eth.Contract(silverRaptorAbi, MAINNET_ADDRESS);

app.get("/silver-raptor", async (req, res) => {
  const html = renderToString(<SilverRaptor />);
  const finalHtml = index.replace("__EGG__", html);
  res.send(finalHtml);
});

app.get("**", async (_, res) => {
  // This will be more useful for pulling individual raptors
  // And plugging the data into the window to avoid rerendering

  // const owner = await contract.methods
  //   .tokenURI(125)
  //   .call()
  //   .catch((e) => console.log(e));

  // const metadata = await fetch(`https://ipfs.io/${owner.replace(":/", "")}`)
  //   .then((r) => r.json())
  //   .catch((e) => console.log(e));
  const metadata = mockMeta;
  const html = renderToString(<App metadata={metadata} />);
  const finalHtml = index
    .replace("__EGG__", html)
    .replace("__META_DATA__", JSON.stringify(metadata));
  res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
  return res.status(200).send(finalHtml);
});

export let ssrapp = functions.https.onRequest(app);
const mockMeta = {
  name: "Silver Raptor 125",
  description: "The 125th Silver Raptor",
  external_url: "https://raptor.pizza/silver-raptors/125",
  image: "ipfs://QmYqPSXpWdZuLHUBZn22JizV88vzDmEJyLg4sdCd6Dy4de",
  animation_url:
    "ipfs://QmT729X131cHpsbxyQy9BkrTebcTPajjFevDbk4UXc3YBR?filename=silver_raptor.glb",
  attributes: [{ display_type: "number", trait_type: "Gen", value: 1 }],
};
