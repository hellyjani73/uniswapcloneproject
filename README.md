# uniswapcloneproject
 Welcome to the Uniswap Clone project! This decentralized exchange (DEX) is built using Solidity for the smart contracts, React for the front-end, and Hardhat for development and testing. Users can interact with the application using MetaMask as their wallet.
# Features
# Swap:
Exchange tokens directly from the user's wallet using the Uniswap-like swapping mechanism.

# Pool: 
Provide liquidity to different token pairs and earn fees in return.

# Tokens:
Explore and view available tokens on the platform.
Getting Started
# To get started with the Uniswap Clone, follow these steps:

Clone the repository:
bash
Copy code
git clone https://github.com/hellyjani73/uniswap-clone.git
# Install dependencies:
cd uniswap-clone
npm install
# Start the development environment:
npm start
Open your browser and navigate to http://localhost:3000 to interact with the application.
# Usage
Connect your MetaMask wallet to the application.

Use the provided interface to swap tokens, provide liquidity to pools, or explore available tokens.

Make sure you are connected to the appropriate Ethereum network (e.g., Ropsten, Kovan) in MetaMask.

# Smart Contracts
The smart contracts for this project are located in the contracts/ directory. To compile and deploy them, follow these steps:

# Compile contracts:

npx hardhat compile
# Deploy contracts to the local Hardhat network:

npx hardhat node
npx hardhat run scripts/deploy.js --network localhost

