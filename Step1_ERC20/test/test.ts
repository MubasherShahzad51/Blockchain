const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Our Demo Token", function () {

  let demoToken: { deployed: () => any; balanceOf: (arg0: any) => any; transfer: (arg0: any, arg1: any) => any; connect: (arg0: any) => { (): any; new(): any; approve: { (arg0: any, arg1: any): any; new(): any; }; }; transferFrom: (arg0: any, arg1: any, arg2: any) => any; };
  let owner: { address: any; };
  let addr1: { address: any; };
  let addr2: { address: any; };

  beforeEach(async function() {
    const DemoToken = await ethers.getContractFactory("DemoToken");
    demoToken = await DemoToken.deploy();
    await demoToken.deployed();

    [owner, addr1, addr2] = await ethers.getSigners();

  });
  
  it("Should successfully deploy", async function () {
    console.log("success!");
  });

  it("Should deploy with 1m of supply for the owner of the contract", async function() {
    const balance = await demoToken.balanceOf(owner.address);
    expect(ethers.utils.formatEther(balance) == 1000000);
  });

  it("Should let you send tokens to another address", async function() {
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await demoToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should let you give another address the approval to send on your behalf", async function() {
    await demoToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("1000"));
    await demoToken.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await demoToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("1000"));
    expect(await demoToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("2000"));
  })
});