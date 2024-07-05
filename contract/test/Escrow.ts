import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";

describe("Escrow", function () {
  const ONE_GWEI = 1_000_000_000;

  async function deployEscrowFixture() {
    const [buyer, seller, arbiter] = await ethers.getSigners();
    const contractAmount = 10 * ONE_GWEI;

    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(
      buyer.address,
      seller.address,
      arbiter.address,
      contractAmount
    );

    return { escrow, buyer, seller, arbiter, contractAmount };
  }

  describe("Deployment", function () {
    it("Should set the right buyer, seller, and arbiter", async function () {
      const { escrow, buyer, seller, arbiter } = await deployEscrowFixture();

      expect(await escrow.buyer()).to.equal(buyer.address);
      expect(await escrow.seller()).to.equal(seller.address);
      expect(await escrow.arbiter()).to.equal(arbiter.address);
    });

    it("Should set the right contract amount", async function () {
      const { escrow, contractAmount } = await deployEscrowFixture();

      expect(await escrow.contractAmount()).to.equal(contractAmount);
    });

    it("Should set the initial state to AWAITING_PAYMENT", async function () {
      const { escrow } = await deployEscrowFixture();

      expect(await escrow.currentState()).to.equal(0); // State.AWAITING_PAYMENT
    });
  });
});
