import { expect } from "chai";
import hre from "hardhat"; 
import { ZombieFactory } from "../typechain-types";

describe("ZombieFactory", () => {
    let zombieFactory:ZombieFactory; // i was using this line without semicolon before...?
    let otherZombieFactory:ZombieFactory;

    beforeEach(async () => {
        const ZombieFactory = await hre.ethers.getContractFactory("ZombieFactory");
        const OtherZombieFactory = await hre.ethers.getContractFactory("ZombieFactory");
        zombieFactory = await ZombieFactory.deploy();
        otherZombieFactory = await OtherZombieFactory.deploy();
    })

    it("Creates a zombie and emits the NewZombie event", async () => {
        //events are fired during the creation, so i capture it with this transaction const
        const transaction = await zombieFactory.createRandomZombie("Bloater");
        
        await expect(transaction).
            to.emit(zombieFactory, "NewZombie");
        
        const zombie = await zombieFactory.zombies(0);

        expect(zombie.name).to.be.equal("Bloater");
        expect(zombie.dna).to.be.a("bigint"); // it is a random big number
    })

    it("Should guarantee the dna is exacly 16 digits", async () => {
        await zombieFactory.createRandomZombie("Clicker");

        const zombies = await zombieFactory.zombies(0);

        //bigint dont have lenght properties like lenghtOf -> convert to string
        //console.log(zombies.dna.toString())
        expect(zombies.dna.toString().length).to.equal(16);
    })

    it("Ensures same name generates same dna", async () => {
        await zombieFactory.createRandomZombie("stalker");
        await otherZombieFactory.createRandomZombie("stalker");
        
        const zombieA = await zombieFactory.zombies(0);
        const zombieB = await otherZombieFactory.zombies(0);

        expect(zombieA.dna).to.be.equal(zombieB.dna);
    })

    it("Should not create a zombie with an empty name", async () => {
        await expect(zombieFactory.createRandomZombie(""))
            .to.be.revertedWith("Name cannot be empty");

        // the function createRandomZombie("") reverts so if you put await inside expect()
        // the error is thrown before the assertion happens, so the test breaks with UnhandledPromiseRejection or ProviderError
    })
    
    it("Should revert if the same player tries to create a new Zombie", async () => {
        await zombieFactory.createRandomZombie("nameA");

        await expect(zombieFactory.createRandomZombie("nameB"))
            .to.be.revertedWith("Only one zombie can be created per owner");
    })
})
