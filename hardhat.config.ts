import { HardhatUserConfig } from "hardhat/config";
//import "@nomicfoundation/hardhat-toolbox";
import '@nomicfoundation/hardhat-ethers';
import '@typechain/hardhat';
import "@nomicfoundation/hardhat-chai-matchers";


const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "hh",
  // config of the blockchain networks
  networks: {
    hh: {
      url: "http://127.0.0.1:8545/"
    }
  },
    typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },

};

export default config;
