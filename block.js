const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {
  constructor({ timeStamp, lastHash, hash, data, nonce, difficulty }) {
    this.timeStamp = timeStamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {               //thisFunctionReturnsTheGenesisBlock-"GENESIS_DATA"from config.js
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timeStamp;
    // const timeStamp = Date.now();
    const lastHash = lastBlock.hash;
    let {difficulty} = lastBlock;
    let nonce = 0;

    do{
      nonce++;
      timeStamp = Date.now();
      difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timeStamp});
      hash= cryptoHash(timeStamp, lastHash, data, nonce, difficulty);
    }while( hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));

    return new this({
      timeStamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash
      // hash: cryptoHash(timeStamp, lastHash, data, nonce, difficulty)
    });
  }

  static adjustDifficulty({originalBlock, timeStamp}){
    const {difficulty} = originalBlock;

    const timeDifference = timeStamp - originalBlock.timeStamp;

    if (difficulty < 1) return 1;

    if (timeDifference > MINE_RATE ) return difficulty -1; 

    return difficulty +1;
  }

}

module.exports = Block;