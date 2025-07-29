import { expect } from "chai";
import hre from "hardhat"; 
import { ZombieFactory } from "../typechain-types";

describe("ZombieFactory", () => {
    //Verifies if a zombie was actually creadted with the number of elements of the array being 1
    let z:ZombieFactory
    beforeEach(async () => {
        const ZombieFactory = await hre.ethers.getContractFactory("ZombieFactory");
        z = await ZombieFactory.deploy();
    })

    it("Should create a Zombie and verify its name, and dna type", async () => {
        await z.createRandomZombie("Bloater"); // i can only use my public function
        const zombies = await z.zombies(0);

        //expect(await z.zombies(0).name).to.be.equal("Bloater");
        expect(zombies.name).to.be.equal("Bloater");
        expect(zombies.dna).to.be.a("BigInt"); // it is a random big number

        // cant verify dna cause it is random
        await expect(z.createRandomZombie("Clicker")).to.emit(z, "NewZombie")//.withArgs(1n, "Clicker", expect.any(BigInt));
    })
})
