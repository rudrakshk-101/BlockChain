
const express = require("express");
const bodyParser = require("body-parser")
const Blockchain = require("./blockchain/blockchain");
const PubSub = require("./app/pubsub");
const request = require("request");

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain});

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

// setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
    res.json(blockchain.chain);
});

app.post("/api/mine", (req, res) => {
    const {data} = req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect("/api/blocks");
});

const syncWithRootState = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);
  
        console.log('replace chain on a sync with', rootChain);
        blockchain.replaceChain(rootChain);
      }
    });
  };
  
   



//configuration for port
// const DEFAULT_PORT = 3000;
let PEER_PORT;
if(process.env.GENERATE_PEER_PORT === 'true'){
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}
const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening at localhost:${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    syncWithRootState();
  }
});