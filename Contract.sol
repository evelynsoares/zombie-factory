pragma solidity >=0.5.0 <0.6.0;

contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    
    struct Zombie {
        string name;
        uint dna;
    }
    Zombie[] public zombies; // an array of zombies without size limit

    // memory is where the variable of complex type will be stored (or not stored in this case), its data location
    function _createZombie(string memory _name, uint _dna) private { // private functions are ususally declared like this
        zombies.push(Zombie(_name, _dna));

    }
    
    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = unint(keccak256(abi.encodePacked(_str)));
        

    }
}

/*
he first line of code should take the keccak256 hash of abi.encodePacked(_str) 
to generate a pseudo-random hexadecimal,
 typecast it as a uint, and finally store the result in a uint called rand.

We want our DNA to only be 16 digits long (remember our dnaModulus?). 
So the second line of code should return the above value modulus (%) dnaModulus.

*/
