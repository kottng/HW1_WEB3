const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC721", function () {
    let MyERC721, myERC721, owner, addr1;

    beforeEach(async function () {
        MyERC721 = await ethers.getContractFactory("MyERC721");
        [owner, addr1, _] = await ethers.getSigners();
        myERC721 = await MyERC721.deploy();
    });

    it("Should mint NFT to owner", async function () {
        await myERC721.mint(owner.address);
        expect(await myERC721.ownerOf(0)).to.equal(owner.address);
    });

    it("Should allow buying NFT", async function () {
        await myERC721.connect(addr1).buyNFT({
            value: ethers.parseEther("0.05")
        });
        expect(await myERC721.ownerOf(0)).to.equal(addr1.address);
    });
});
