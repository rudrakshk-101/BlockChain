const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("../config");
const cryptoHash = require("../util/crypto-hash");

class Block {
  constructor({ timeStamp, lastHash, hash, data, nonce, difficulty }) { //this is just the constructor for this class "Block", which is creating the object with the following key value pair
    this.timeStamp = timeStamp; //time at which the block is made
    this.lastHash = lastHash; //hash of the previous block
    this.hash = hash; //hash value generated from crypto-hash.js using timeStamp, lastHash, data, nonce, difficulty
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {               //thisFunctionReturnsTheGenesisBlock-"GENESIS_DATA"from config.js
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) { //this function is used to mine a new block into the blockchain
    let hash, timeStamp; //declaring variable values as they will update ahead in time
    // const timeStamp = Date.now();
    const lastHash = lastBlock.hash; // Retrieves the hash of the last block from the lastBlock parameter
    let {difficulty} = lastBlock; // Destructures(this is a javascript feature) the difficulty property from the lastBlock parameter and stores it in the difficulty variable
    let nonce = 0; //Initializes the nonce (a number that miners change to find a valid block hash) to 0.

    do{ //This is a do-while loop that keeps running until a valid block hash is found. The loop increments the nonce and recalculates the timeStamp and difficulty until the condition in the while statement is met.
      nonce++;
      timeStamp = Date.now();
      difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timeStamp}); // Recalculate the difficulty for mining based on the current block's timestamp and the previous block's difficulty
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