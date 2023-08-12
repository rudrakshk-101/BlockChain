const { describe } = require("node:test");
const Block = require("./block");
const { GENESIS_DATA } = require("./config");


describe("Block", () => {
    const timeStamp = "21/01/2002";
    const lastHash = "0000";
    const hash = "1001";
    const data = ["fgjh", "gshjj"];
    const block = new Block({timeStamp, lastHash, hash, data});

    it("has a timeStamp, lastHash, hash, and data property", () => {
        expect(block.timeStamp).toEqual(timeStamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        
    });

    describe("genesis()", () => {
        const genesisBlock = Block.genesis();
        console.log(genesisBlock);
        it("returns a Block Instance", () =>{
            expect(genesisBlock instanceof Block).toBe(true)
        });
        it("returns a Genesis Data", () =>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({ lastBlock, data });
    
        it('returns a Block instance', () => {
          expect(minedBlock instanceof Block).toBe(true);
        });
    
        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
          expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });
    
        it('sets the `data`', () => {
          expect(minedBlock.data).toEqual(data);
        });
    
        it('sets a `timestamp`', () => {
          expect(minedBlock.timestamp).not.toEqual(undefined);
        });
      });

});