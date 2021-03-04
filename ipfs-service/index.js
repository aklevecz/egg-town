const express = require("express");
const IPFS = require("ipfs-core");
const app = express();

(async () => {
  const ipfs = await IPFS.create();

  app.get("/", async (req, res) => {
    console.log("Hello world received a request.");
    const { cid } = await ipfs.add("chicken" + Date.now());
    res.send(`Hello ${cid}!`);
  });

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log("IPFS-Service listening on port", port);
  });
})();
