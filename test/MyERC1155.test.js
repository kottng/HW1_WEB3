const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC1155", function () {
  let MyERC1155, myERC1155, owner, addr1;

  beforeEach(async function () {
    MyERC1155 = await ethers.getContractFactory("MyERC1155");
    [owner, addr1, _] = await ethers.getSigners();
    myERC1155 = await MyERC1155.deploy(owner.address);
  });

  it("Should mint tokens to owner", async function () {
    await myERC1155.mint(owner.address, 1, 100, "0x");
    expect(await myERC1155.balanceOf(owner.address, 1)).to.equal(100);
  });

  it("Should allow buying tokens", async function () {
    await myERC1155.connect(addr1).buyTokens(1, 10, { value: ethers.parseEther("0.1") });
    expect(await myERC1155.balanceOf(addr1.address, 1)).to.equal(10);
  });
});

