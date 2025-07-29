import { expect } from "chai";
import hre from "hardhat"; // hardhat runtime env
import { Counter } from "../typechain-types";
//ctrl shift space

describe("Counter", () => {

    let c:Counter;
    //before each test; async because i need to wait a connection
    beforeEach(async () => {
        const Counter = await hre.ethers.getContractFactory("Counter");
        c = await Counter.deploy(); // deploys a contract
    })

    it("Should Increment Counter By One", async () => {
        await c._incrementCounter();
        
        // counter read as a get function
        expect(await c.counter()).to.be.equal(1n);
    })
})
