const exp = require("constants");
const Block = require("./block");
const { GENESIS_DATA, MINE_RATE } = require("../config");
const cryptoHash = require("../util/crypto-hash");
const hexToBinary = require("hex-to-binary");

describe("Block", () => {
  const timeStamp = 2000;
  const lastHash = "849562";
  const hash = "456566";
  const data = ["blockchain", "data"];
  const nonce = 1;
  const difficulty = 1;
  const block = new Block({ timeStamp, lastHash, hash, data, nonce, difficulty });

  it("has a timeStamp, lastHash, hash, and a data property", () => {
    expect(block.timeStamp).toEqual(timeStamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("returns a Block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` to be the `hash` of the lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets a `timeStamp`", () => {
      expect(minedBlock.timeStamp).not.toEqual(undefined);
    });

    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(minedBlock.hash)
        .toEqual(
          cryptoHash(
            minedBlock.timeStamp, 
            minedBlock.nonce,
            minedBlock.difficulty,
            lastBlock.hash, 
            data
            ));
    });
    it("sets a 'hash' that matches the difficulty criteria", ()=>{
      expect( hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty));
    });
    it("adjusts the difficulty", () => {
      const possibleResults = [lastBlock.difficulty+1, lastBlock.difficulty-1];
      expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
    });
  });

  describe("adjustDifficulty()", () => {
    it("raises difficulty for a quickly mined block", () => {
      expect(Block.adjustDifficulty({
        originalBlock: block,
        timeStamp: block.timeStamp + MINE_RATE -100
      })).toEqual(block.difficulty+1);
    });

    it("lowers difficulty for a slowly mined block", () => {
      expect(Block.adjustDifficulty({
        originalBlock: block,
        timeStamp: block.timeStamp + MINE_RATE +100
      })).toEqual(block.difficulty-1);
    });

    it("has a lower limit of 1", () => {
      block.difficulty = -1;
      expect(Block.adjustDifficulty({originalBlock: block})).toEqual(1);
    });
  });
});