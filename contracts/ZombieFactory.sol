// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    
    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies; // an array of zombies without size limit

    // ------ key => value
    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    // memory is where the variable of complex type will be stored, (or not stored in this case), its data location
    function _createZombie(string memory _name, uint _dna) private { // private functions are ususally declared like this
        zombies.push(Zombie(_name, _dna)); // .push no longer returns the new length in Solidity >=0.6.0
        uint id = zombies.length - 1;

        // msg.sender refers to the address of the person (or smart contract) who called the current function
        // mapps to store msg.sender under the id of the zombieToOwner and increases its counter 
        // the zombie created belong to msg.sender
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;

        emit NewZombie(id, _name, _dna); // lets front-end know something happenend by firing this event
    }
    
    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));

        return rand % dnaModulus; // remainder of (rand / dnaModulus)
    }

    function createRandomZombie(string memory _name) public {
        // cant compare string with simple ==  or != in solidity
        require(bytes(_name).length > 0, "Name cannot be empty");

        // require makes it so that the function will throw an error and stop executing if some condition is not true
        require(ownerZombieCount[msg.sender] == 0, "Only one zombie can be created per owner");

        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }
}