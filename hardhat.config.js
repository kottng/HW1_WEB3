require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
    solidity: "0.8.27",
    networks: {
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        localhost: {
            url: "http://127.0.0.1:8545",
        }
    },
    etherscan: {
        apiKey: "QFQZI2V65SNVBI7FNX747KADMX1C7N5KIR",
        urls: {
            apiURL: "https://api-sepolia.etherscan.io/api",
        }
    },
    sourcify: {
        enabled: true
    }
};

console.log("ALCHEMY_API_KEY:", process.env.ALCHEMY_API_KEY);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);
