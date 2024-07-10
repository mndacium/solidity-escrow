import { expect } from "chai";
import { ethers } from "hardhat";
import { Escrow } from "../typechain-types";

describe("EscrowFactory", function () {
  const ONE_GWEI = 1_000_000_000;

  async function deployEscrowFactoryFixture() {
    const [deployer, buyer, seller, arbiter] = await ethers.getSigners();
    const contractAmount = 10 * ONE_GWEI;

    const EscrowFactory = await ethers.getContractFactory("EscrowFactory");
    const escrowFactory = await EscrowFactory.deploy();

    return { escrowFactory, deployer, buyer, seller, arbiter, contractAmount };
  }

  describe("createEscrow", function () {
    it("Should create a new Escrow contract", async function () {
      const { escrowFactory, buyer, seller, arbiter, contractAmount } =
        await deployEscrowFactoryFixture();

      await escrowFactory
        .connect(buyer)
        .createEscrow(
          buyer.address,
          seller.address,
          arbiter.address,
          contractAmount
        );

      const escrowContracts = await escrowFactory.getEscrowContracts();
      expect(escrowContracts.length).to.equal(1);
    });

    it("Should store the created Escrow contract address", async function () {
      const { escrowFactory, buyer, seller, arbiter, contractAmount } =
        await deployEscrowFactoryFixture();

      await escrowFactory
        .connect(buyer)
        .createEscrow(
          buyer.address,
          seller.address,
          arbiter.address,
          contractAmount
        );

      const escrowContracts = await escrowFactory.getEscrowContracts();
      const createdEscrowAddress = escrowContracts[0];

      expect(createdEscrowAddress).to.properAddress;
    });

    it("Should initialize the created Escrow contract with correct details", async function () {
      const { escrowFactory, buyer, seller, arbiter, contractAmount } =
        await deployEscrowFactoryFixture();

      await escrowFactory
        .connect(buyer)
        .createEscrow(
          buyer.address,
          seller.address,
          arbiter.address,
          contractAmount
        );

      const escrowContracts = await escrowFactory.getEscrowContracts();
      const createdEscrowAddress = escrowContracts[0];

      const escrow: Escrow = await ethers.getContractAt(
        "Escrow",
        createdEscrowAddress
      );
      const saleDetails = await escrow.getSaleDetails();

      expect(saleDetails[0]).to.equal(buyer.address);
      expect(saleDetails[1]).to.equal(seller.address);
      expect(saleDetails[2]).to.equal(arbiter.address);
      expect(saleDetails[3]).to.equal(contractAmount);
      expect(saleDetails[4]).to.equal(0); // State.AWAITING_PAYMENT
    });
  });

  describe("getEscrowContracts", function () {
    it("Should return all created Escrow contracts", async function () {
      const { escrowFactory, buyer, seller, arbiter, contractAmount } =
        await deployEscrowFactoryFixture();

      await escrowFactory
        .connect(buyer)
        .createEscrow(
          buyer.address,
          seller.address,
          arbiter.address,
          contractAmount
        );
      await escrowFactory
        .connect(buyer)
        .createEscrow(
          buyer.address,
          seller.address,
          arbiter.address,
          contractAmount
        );

      const escrowContracts = await escrowFactory.getEscrowContracts();
      expect(escrowContracts.length).to.equal(2);
    });
  });
});
