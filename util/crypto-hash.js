const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");

  hash.update(inputs.sort().join(" "));

  return hash.digest("hex");
};

module.exports = cryptoHash;

// const hexToBinary = require("hex-to-binary");

// const cryptoHash = (...inputs) => {
//   const hash = crypto.createHash("sha256");

//   hash.update(inputs.sort().join(" "));

//   return hexToBinary(hash.digest("hex"));
// };

// module.exports = cryptoHash;