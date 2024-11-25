const hre = require("hardhat");

async function main() {
    const MyERC20Address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const MyERC20 = await hre.ethers.getContractAt("MyERC20", MyERC20Address);

    const MyERC721Address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const MyERC721 = await hre.ethers.getContractAt("MyERC721", MyERC721Address);

    const MyERC1155Address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    const MyERC1155 = await hre.ethers.getContractAt("MyERC1155", MyERC1155Address);

    const [owner, addr1] = await hre.ethers.getSigners();

    // ___ ERC20 ___
    console.log("____ ERC20 ____");
    const ownerBalance = await MyERC20.balanceOf(owner.address);
    console.log('Баланс владельца: ',hre.ethers.formatUnits(ownerBalance, 18));

    console.log("Перевод 1000");
    await MyERC20.transfer(addr1.address, hre.ethers.parseUnits("1000", 18));
    const addr1Balance = await MyERC20.balanceOf(addr1.address);
    console.log('Баланс addr1: ', hre.ethers.formatUnits(addr1Balance, 18));

    console.log("Покупка токенов");
    await MyERC20.connect(addr1).buy({ value: hre.ethers.parseUnits("0.01", "ether") });
    const newAddr1Balance = await MyERC20.balanceOf(addr1.address);
    console.log('Новый баланс addr1: ', hre.ethers.formatUnits(newAddr1Balance, 18));

    // ___ ERC721 ___
    console.log("____ ERC721 ____");
    console.log("Минтируем NFT...");
    await MyERC721.mint(owner.address);
    console.log("NFT успешно заминтовано владельцу!");

    console.log("Покупка NFT...");
    await MyERC721.connect(addr1).buyNFT({ value: hre.ethers.parseEther("0.05") });
    console.log("NFT успешно куплено addr1!");

    // ___ ERC1155 ___
    console.log("____ ERC1155 ____");
    console.log("Минт 100 токенов с ID 1...");
    await MyERC1155.mint(owner.address, 1, 100, "0x");
    console.log("ERC1155 токены успешно заминтованы!");
    let addr1TokenBalance = await MyERC1155.balanceOf(addr1.address, 1);
    console.log('Баланс addr1: ', addr1TokenBalance)
    console.log("Покупка 10 токенов ERC1155 с ID 1...");
    await MyERC1155.connect(addr1).buyTokens(1, 10, { value: hre.ethers.parseEther("0.1") });
    addr1TokenBalance = await MyERC1155.balanceOf(addr1.address, 1);
    console.log('Баланс addr1 токенов с ID 1:', addr1TokenBalance);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Ошибка:", error);
        process.exit(1);
    });