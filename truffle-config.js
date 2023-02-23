// Allows us to use ES6 in our migrations and tests.
// require('babel-register')
const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

const MNEMONIC = "dolphin worth access eyebrow sunset practice deposit build course response unlock steel"
const REMOTE_NODE = "https://goerli.infura.io/v3/37d174c0a6274d24bd0b557836e001fb";
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
      gas: 4465030,
      gasPrice: 10000000000,
    },
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
// // Setup
// import { Network, Alchemy } from 'alchemy-sdk';

// const settings = {
//     apiKey: "7xJqA9CGdVqsJzsMiaEJ3fLAZ6sFwc3Y",
//     network: Network.ETH_GOERLI,
// };

// const alchemy = new Alchemy(settings);

// // Get the latest block
// const latestBlock = alchemy.core.getBlockNumber();

// // Get all outbound transfers for a provided address
// alchemy.core
//     .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
//     .then(console.log);

// // Get all the NFTs owned by an address
// const nfts = alchemy.nft.getNftsForOwner("0xshah.eth");

// // Listen to all new pending transactions
// alchemy.ws.on(
//     { method: "alchemy_pendingTransactions",
//     fromAddress: "0xshah.eth" },
//     (res) => console.log(res)
// );