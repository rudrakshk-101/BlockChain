const Transaction = require('../wallet/transaction');

class TransactionMiner {
    constructor({ blockchain, transactionPool, wallet, pubsub }) {
      this.blockchain = blockchain;
      this.transactionPool = transactionPool;
      this.wallet = wallet;
      this.pubsub = pubsub;
    }
  
    mineTransactions() {
        const validTransactions = this.transactionPool.validTransactions(); // get the transaction pool's valid transactions
  
        validTransactions.push(
            Transaction.rewardTransaction({ minerWallet: this.wallet })
          ); // generate the miner's reward
  
          this.blockchain.addBlock({ data: validTransactions });  // add a block consisting of these transactions to the blockchain
  
          this.pubsub.broadcastChain(); // broadcast the updated blockchain
  // clear the pool
          this.transactionPool.clear();  
          this.transactionPool.clearBlockchainTransactions({chain: this.blockchain});
    }
  }
  
  module.exports = TransactionMiner; 