# NFT Tickets Verification

<div align="center" id="top"></div>

入場Boneboss NightNlub驗證網站
----
### [AWS amplify部署的專案網站鏈結](https://dev.d3o8tmv3x7j8le.amplifyapp.com/)

### 功能介紹:
- 每張門票有10次驗證次數
- 需要連接MetaMask錢包才能Mint門票
- 擁有門票者可以查詢剩餘使用次數或查詢自己的門票資訊


# 專案安裝步驟
----
## 前置作業
### 安裝及創建帳號
1. 安裝VS code、 Git、 Nodejs、 MetaMask、Hardhat。
2. 創建帳號 : PINATA、 ALCHEMY、 EtherScan、 AWS。
3. 領取Sepolia測試幣 https://sepoliafaucet.com/
### 下載專案
1. 在Terminal執行
    ```
    $ git clone https://github.com/crypto0627/nft-tickets-verification.git
    ```
2. 開啟VS Code 在Terminal執行
    ```
    $ cd nft-boneboss
    $ npm install
    $ npm start
    ```
    
    即可看到本地端網頁
    
### 智能合約

1. 智能合約部署上以太測試鏈步驟 
```
$ cd sm
$ npm install
```
2. 到PINATA上傳圖片，會生成一串URI，接著請創建Metadata.json檔，並貼上這串Json。
    ```
    {
      "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
      "external_url": "https://openseacreatures.io/3", 
      "image": "你的IPFS圖片網址", 
      "name": "Dave Starbelly",
      "attributes": [ ... ]
    }
    ```
3. 將Metadata.json檔上傳至PINATA，會生成一串URI(後續設定會用到)。
4. 在sm目錄下創建.env檔
    ```
    ETHERSCAN_KEY="Etherscan上的API KEY"
    PRIVATE_KEY="MetaMask導出的私鑰"
    ALCHEMY_KEY="ALCHEMY生成Sepolia API KEY"
    ```
5.  更改hardhat.config.ts設定檔
    ```
    import { HardhatUserConfig } from "hardhat/config";
    import "@nomicfoundation/hardhat-toolbox";
    import "@nomiclabs/hardhat-etherscan";
    import * as dotenv from "dotenv";
    dotenv.config();

    const config: HardhatUserConfig = {
      solidity: "0.8.9",
      networks:{
        sepolia:{
          url:process.env.ALCHEMY_KEY,
          accounts: [`0x${process.env.PRIVATE_KEY}`],
        },
      },
      etherscan:{
        apiKey: process.env.ETHERSCAN_KEY,
      }
    };

    export default config;

    ```
6. 更改deploy.ts檔
    ```
    import { ethers } from "hardhat";

    async function main() {

      const Boneboss = await ethers.getContractFactory("boneboss");
      const boneboss = await Boneboss.deploy("boneboss","你的MetaMask公鑰");

      await boneboss.deployed();
      const txhash = boneboss.deployTransaction.hash;
      const txReceipt = await ethers.provider.waitForTransaction(txhash);
      console.log(`Contract deployed to :${'https://sepolia.etherscan.io/address/'+txReceipt.contractAddress}`);
    }

    // We recommend this pattern to be able to use async/await everywhere
    // and properly handle errors.
    main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });

    ```

7. 開始部署智能合約
   ```
   $ npx hardhat compile
   $ npx hardhat run scripts/deploy.ts --network sepolia
   ```
   執行完會生成一串合約地址
   ```
   Contract deployed to :https://sepolia.etherscan.io/address/0xF3EdF46f78bF8e43bF187996BeE11AAA18e58D64
   ```
   複製合約地址並執行驗證
   ```
   npx hardhat verify --network sepolia <合約地址> boneboss <你的公鑰>
   ```
8. 合約驗證完後到EtherScan上寫入Token URI![](https://i.imgur.com/XTsfshg.png)

9. 複製生成的abi.json![](https://i.imgur.com/cajK6Cp.png)


### 前端網頁

1. 至nft-boneboss資料夾下的src/utils/interact.js
2. 更改合約地址及Alchemy API KEY![](https://i.imgur.com/8mnY3ha.png)
3. 完成專案部署，在nft-boneboss下執行
    ```
    $ npm start
    ```

### 最終畫面

![](https://i.imgur.com/bXYiHMy.jpg)

- 右上角連接MetaMask錢包
- Mint NFT即可獲得門票
- 輸入門票ID再點擊Verify NFT Ticket即可驗證
- 登入OpenSea https://testnets.opensea.io/ 查看你的門票

### 部署AWS靜態網頁

1. 全域下載AWS CLI，並在nft-boneboss下執行
    ```
      $ amplify configure  
    ```
2. 按照步驟設定IAM帳號 https://docs.amplify.aws/cli/start/install#configure-the-amplify-cli
3. 建好後，執行
    ```
      $ amplify init
      $ amplify add hosting
    ```
4. 即部署好前端網頁![](https://i.imgur.com/NXyaclU.jpg)


<a href="#top">Back to top</a>