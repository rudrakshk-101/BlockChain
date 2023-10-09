const Blockchain = require("../blockchain/blockchain");

const blockchain = new Blockchain();

blockchain.addBlock({data: "initial"});

console.log("first block", blockchain.chain[blockchain.chain.length-1]);

let prevTimeStamp, nextTimeStamp, nextBlock, timeDiff, average;

const times = [];

for(let i =0; i<10000; i++){
    prevTimeStamp = blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data: `block ${i}`});
    nextBlock = blockchain.chain[blockchain.chain.length-1];
    nextTimeStamp = nextBlock.timestamp;
    timeDiff = nextTimeStamp - prevTimeStamp;
    times.push(timeDiff);
    average = times.reduce((total, num) => (total + num))/times.length;
    console.log(`time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average Time: ${average}ms`);
}