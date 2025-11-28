// ------------------------------
// Block Class
// ------------------------------
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;           // { patientId, patientName, diagnosis }
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  // Simple hash function for demo purposes
  calculateHash() {
    const raw =
      this.index +
      "|" +
      this.timestamp +
      "|" +
      JSON.stringify(this.data) +
      "|" +
      this.previousHash;

    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }

    // Return hex string
    return hash.toString(16);
  }
}

// ------------------------------
// Blockchain Class
// ------------------------------
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(
      0,
      new Date().toISOString(),
      { message: "Genesis Block" },
      "0"
    );
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    // Link to previous block
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // Recalculate hash and compare
      if (current.hash !== current.calculateHash()) {
        return false;
      }

      // Check link to previous
      if (current.previousHash !== previous.hash) {
        return false;
      }
    }
    return true;
  }
}

// ----------------------------------------------------
// Create global blockchain object for the UI to use
// ----------------------------------------------------
const medicalChain = new Blockchain();

window.blockchainApp = {
  // Called from handleAddRecord in ui.js
  addRecord: function (patientId, patientName, diagnosis) {
    const data = {
      patientId,
      patientName,
      diagnosis,
    };

    const newBlock = new Block(
      medicalChain.chain.length,
      new Date().toISOString(),
      data,
      medicalChain.getLatestBlock().hash
    );

    medicalChain.addBlock(newBlock);
    return newBlock;
  },

  // Called from handleShowChain in viewChain.html
  getChain: function () {
    return medicalChain.chain;
  },

  // Called from handleValidateChain in validate.html
  isValid: function () {
    return medicalChain.isChainValid();
  },
};