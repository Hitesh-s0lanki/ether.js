//ethers ^6.8.1

const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  //   const provider = new ethers.JsonRpcProvider(
  //     "https://polygon-mumbai.infura.io/v3/41aac06a1314486ab97b98baacfadfec"
  //   );

  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying the contract....");
  const contract = await contractFactory.deploy();

  // try {
  //   // Call the retrieve function
  //   // let currentFavoriteNumber = await contract.retrieve();
  //   const transaction = await contract.retrieve({
  //     gasPrice: ethers.utils.parseUnits("20", "gwei"),
  //   });
  //   console.log("Current favorite number:", currentFavoriteNumber.toString());

  //   await contract.store(7);

  //   currentFavoriteNumber = await contract.retrieve();
  //   console.log("Current favorite number:", currentFavoriteNumber.toString());
  // } catch (error) {
  //   console.error("Error calling retrieve function:", error);
  // }

  // try {
  //   const transaction = await contract.retrieve({
  //     gasPrice: ethers.utils.parseUnits("20", "gwei"),
  //     gasLimit: 200000,
  //   });

  //   // Wait for the transaction to be mined
  //   await transaction.wait();

  //   const currentFavoriteNumber = await contract.retrieve();
  //   console.log("Current favorite number:", currentFavoriteNumber.toString());
  // } catch (error) {
  //   console.error("Error calling retrieve function:", error);
  // }
}

main();
