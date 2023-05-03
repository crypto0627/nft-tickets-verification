import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    sepolia:{
      url:"https://eth-sepolia.g.alchemy.com/v2/R0bZLTKpOqv17Jlw1rld3VFczbUag2Bc",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan:{
    apiKey: "ZHMAVD1UUC11MZP6YWBIS5FYBQKQZIKWID",
  }
};

export default config;
