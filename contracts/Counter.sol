// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
    uint256 public counter;

    constructor () {
        counter = 0;
    }

    function _incrementCounter() public { 
        counter++;
    }
}