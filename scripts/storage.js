const { ethers } = require("hardhat");
const { hexZeroPad } = require("@ethersproject/bytes");

async function main() {
    const tokensAddress = ["0x5FbDB2315678afecb367f032d93F642f64180aa3","0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512","0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"]
    for (let i = 0; i < 3; i++) {
        const tokenAddress = tokensAddress[i];
        const userAddress = "0x770Ad7F14ded80A47C3E95544E7937D8Aeca47a5"; 
        
        const paddedUserAddress = hexZeroPad(userAddress, 32); 
        const balanceSlot = hexZeroPad("0x00", 32); 
        const slotHash = ethers.keccak256(paddedUserAddress + balanceSlot.slice(2))
        
        const rawBalance = await ethers.provider.getStorage(tokenAddress, slotHash); 
        const balance = ethers.toBigInt(rawBalance); 
        
        console.log("Слот для баланса: ", slotHash);
        console.log("баланс: ", balance.toString());
    }
}

main()