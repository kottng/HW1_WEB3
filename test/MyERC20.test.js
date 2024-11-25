const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC20", function () {
    let MyERC20, myERC20, owner, addr1, addr2;

    beforeEach(async function () {
        MyERC20 = await ethers.getContractFactory("MyERC20");
        [owner, addr1, addr2] = await ethers.getSigners();
        myERC20 = await MyERC20.deploy(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
        const ownerBalance = await myERC20.balanceOf(owner.address);
        expect(await myERC20.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens with fee", async function () {
        const addr1BalanceBefore = await myERC20.balanceOf(addr1.address);
        expect(addr1BalanceBefore).to.equal(0);
        await myERC20.transfer(addr1.address, 1000);
        const addr1Balance = await myERC20.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(990);
    });

    it("Should transferFrom tokens with fee", async function () {
        const addr1BalanceBefore = await myERC20.balanceOf(addr1.address);
        expect(addr1BalanceBefore, 0);
        await myERC20.approve(addr1.address, 1000);
        await myERC20.connect(addr1).transferFrom(owner, addr1.address, 1000);
        const finalBuyer = await myERC20.balanceOf(addr1.address);
        expect(finalBuyer, 950);
    });
    
    it("Should allow buying tokens", async function () {
        const ownerBalance = await myERC20.balanceOf(owner.address);
        console.log("Owner balance after deployment:", ownerBalance.toString());
        expect(await myERC20.totalSupply()).to.equal(ownerBalance);
        await myERC20.connect(addr1).buy({ value: 10 });
        const addr1Balance = await myERC20.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(10);
    });
});
