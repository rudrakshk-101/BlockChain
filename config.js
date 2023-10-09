const INITIAL_DIFFICULTY = 3;

const MINE_RATE = 1000; // 1000 is for 1000 milli seconds, that is one second

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: "0000000",
    hash: "1010101",
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
  };

  const STARTING_BALANCE = 999;

  const REWARD_INPUT = { address: '*authorized-reward*' };

const MINING_REWARD = 50;

module.exports = {
  GENESIS_DATA,
  MINE_RATE,
  STARTING_BALANCE,
  REWARD_INPUT,
  MINING_REWARD
};
 