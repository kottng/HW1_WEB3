require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//     solidity: "0.8.27",
//     networks: {
//         goerli: {
//             url: "https://eth-goerli.alchemyapi.io/v2/" + process.env.ALCHEMY_API_KEY,
//             accounts: [`0x${process.env.PRIVATE_KEY}`],
//         },
//     }
// };


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
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: "QFQZI2V65SNVBI7FNX747KADMX1C7N5KIR",
        urls: {
            apiURL: "https://api-sepolia.etherscan.io/api",
        }
    },
    sourcify: {
        // Disabled by default
        // Doesn't need an API key
        enabled: true
    }
};

console.log("ALCHEMY_API_KEY:", process.env.ALCHEMY_API_KEY);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);
