const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

const MNEMONIC = "dolphin worth access eyebrow sunset practice deposit build course response unlock steel"
const REMOTE_NODE = "https://goerli.infura.io/v3/37d174c0a6274d24bd0b557836e001fb";

const REMOTE_NODE_SEPOLIA = "https://sepolia.infura.io/v3/37d174c0a6274d24bd0b557836e001fb";
// const REMOTE_NODE='https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY;

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },    
      // provider: () => new HDWalletProvider(process.env.MNEMONIC,process.env.REMOTE_NODE),
      // provider: () => new HDWalletProvider(MNEMONIC,REMOTE_NODE),
    goerli: {
      provider: () => {
        return new HDWalletProvider(MNEMONIC, REMOTE_NODE)
      },
      network_id: '5', // eslint-disable-line camelcase
      // gas: 4465030,
      // gasPrice: 10000000000,
      timeoutBlocks: 200,
      networkCheckTimeout: 999999,  
      skipDryRun: true 
    },
    sepolia: {
      provider: () => 
      new HDWalletProvider(
        MNEMONIC, REMOTE_NODE_SEPOLIA      
      ),
      network_id: 11155111,
      gas:5221975,
      gasPrice:20000000000,
      confirmations: 3,
      timeoutBlocks:200,
      skipDryRun: true
    }
  },

  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: { 
    }
  }
}
