// ------------------------------
// Block Class
// ------------------------------
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data; // patient info
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  // Lightweight hash function (demo only)
  calculateHash() {
    const str =
      this.index +
      "|" +
      this.timestamp +
      "|" +
      JSON.stringify(this.data) +
      "|" +
      this.previousHash;

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // force 32-bit
    }

    return hash.toString(16);
  }
}

// ------------------------------
// Local storage helpers
// ------------------------------
function saveChainToStorage(chain) {
  try {
    localStorage.setItem("medChain", JSON.stringify(chain));
  } catch (err) {
    console.error("Failed to save chain:", err);
  }
}

function loadChainFromStorage() {
  try {
    const saved = localStorage.getItem("medChain");
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    // Rebuild real Block objects from plain JSON
    return parsed.map((b) => {
      const block = new Block(b.index, b.timestamp, b.data, b.previousHash);
      // keep original hash so nothing changes
      block.hash = b.hash;
      return block;
    });
  } catch (err) {
    console.error("Failed to load chain:", err);
    return null;
  }
}

// ------------------------------
// Blockchain Class
// ------------------------------
class Blockchain {
  constructor() {
    const loaded = loadChainFromStorage();

    if (loaded && loaded.length > 0) {
      this.chain = loaded;
    } else {
      this.chain = [this.createGenesisBlock()];
      saveChainToStorage(this.chain);
    }
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
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    saveChainToStorage(this.chain); // 🔐 persist after every write
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];

      if (curr.hash !== curr.calculateHash()) return false;
      if (curr.previousHash !== prev.hash) return false;
    }
    return true;
  }
}

// ------------------------------
// Shared blockchain instance
// ------------------------------
const medicalChain = new Blockchain();

// ------------------------------
// Public API for UI integration
// ------------------------------
window.blockchainApp = {
  // Called by handleAddRecord in ui.js
  addRecord: function (patientId, patientName, diagnosis) {
    const data = { patientId, patientName, diagnosis };

    const newBlock = new Block(
      medicalChain.chain.length,
      new Date().toISOString(),
      data,
      medicalChain.getLatestBlock().hash
    );

    return medicalChain.addBlock(newBlock);
  },

  // Called by handleShowChain in viewChain.html
  getChain: function () {
    return medicalChain.chain;
  },

  // Called by handleValidateChain in validate.html
  isValid: function () {
    return medicalChain.isChainValid();
  }
};
