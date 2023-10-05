const { log } = require("console");

const lightningHash = (data) => {
    return data + "*";
}

class Block {
    constructor(data, hash, lastHash) { 
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
    }

}

class Blockchain{
    constructor() {
        const genesis = new Block("gen", "ghash", "0000");
        this.chain = [genesis];
    }
    addBlock(data) {
        const lastHash = this.chain[this.chain.length-1].hash;
        const hash = lightningHash(data + lastHash);
        const block = new Block(data, hash, lastHash);
        this.chain.push(block);
    }
}

const fBlockchain = new Blockchain();
fBlockchain.addBlock("One");
fBlockchain.addBlock("Two");
fBlockchain.addBlock("Three");
console.log(fBlockchain);