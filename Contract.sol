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
