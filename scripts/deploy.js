const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const MyERC20 = await hre.ethers.getContractFactory("MyERC20");
    const myERC20 = await MyERC20.deploy(deployer.address);
    await myERC20.waitForDeployment();
    const addressERC20 = await myERC20.getAddress();
    console.log("MyERC20 deployed to:", addressERC20);

    const MyERC721 = await hre.ethers.getContractFactory("MyERC721");
    const myERC721 = await MyERC721.deploy();
    await myERC721.waitForDeployment();
    const addressERC721 = await myERC721.getAddress();
    console.log("MyERC721 deployed to:", addressERC721);

    const MyERC1155 = await hre.ethers.getContractFactory("MyERC1155");
    const myERC1155 = await MyERC1155.deploy(deployer.address);
    await myERC1155.waitForDeployment();
    const addressERC1155 = await myERC1155.getAddress();
    console.log("MyERC1155 deployed to:", addressERC1155);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error('error is ', error);
        process.exit(1);
    });