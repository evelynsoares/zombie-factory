# Zombie Factory – Smart Contract Project

## Requirements

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/) (v18+ recommended)
* [TypeScript](https://www.typescriptlang.org/)
* [Hardhat](https://hardhat.org/)
* [Solidity](https://docs.soliditylang.org/)

Install all required project dependencies:

```bash
npm install
```

If you don't have Hardhat globally installed:

```bash
npm install --save-dev hardhat
```

## Development Commands

### Start a Local Hardhat Node

```bash
npx hardhat node
```

This runs a local Ethereum network for deploying and testing contracts.

### Run Tests

To run all tests:

```bash
npx hardhat test
```

To run a specific test file:

```bash
npx hardhat test test/<FileName>
```