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

  describe("Deposits", function () {
    it("Should allow the buyer to deposit the correct amount", async function () {
      const { escrow, buyer, contractAmount } = await deployEscrowFixture();

      await expect(
        escrow.connect(buyer).deposit({ value: contractAmount })
      ).to.changeEtherBalances(
        [buyer, escrow],
        [-contractAmount, contractAmount]
      );

      expect(await escrow.currentState()).to.equal(1); // State.AWAITING_DELIVERY
    });

    it("Should revert if deposit amount is incorrect", async function () {
      const { escrow, buyer } = await deployEscrowFixture();
      const incorrectAmount = 5 * ONE_GWEI;

      await expect(
        escrow.connect(buyer).deposit({ value: incorrectAmount })
      ).to.be.revertedWith(
        "The amount sent is not equal to the amount of the contract"
      );
    });

    it("Should revert if not called by buyer", async function () {
      const { escrow, seller, contractAmount } = await deployEscrowFixture();

      await expect(
        escrow.connect(seller).deposit({ value: contractAmount })
      ).to.be.revertedWith("Only buyer can call this method");
    });
  });

  describe("Delivery Confirmation", function () {
    it("Should allow the buyer to confirm delivery", async function () {
      const { escrow, buyer, contractAmount } = await deployEscrowFixture();

      await escrow.connect(buyer).deposit({ value: contractAmount });

      await escrow.connect(buyer).confirmDelivery();

      expect(await escrow.currentState()).to.equal(2); // State.COMPLETE_DELIVERY
    });

    it("Should revert if not called by buyer", async function () {
      const { escrow, buyer, seller, contractAmount } =
        await deployEscrowFixture();

      await escrow.connect(buyer).deposit({ value: contractAmount });

      await expect(escrow.connect(seller).confirmDelivery()).to.be.revertedWith(
        "Only buyer can call this method"
      );
    });
  });
});
