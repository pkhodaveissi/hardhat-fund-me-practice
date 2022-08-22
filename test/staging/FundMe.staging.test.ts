import { assert, expect } from "chai"
import { Contract } from "ethers"
import { ethers, getNamedAccounts, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
// only run on test nets
developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async () => {
      let fundMe: Contract
      let deployer: string
      const sendValue = ethers.utils.parseEther("1")

      beforeEach(async () => {
        // deploy our fundMe contract
        // using hardhat-deploy
        deployer = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContract("FundMe", deployer)
      })

      it("allows people to fund and withdraw", async () => {
          await fundMe.fund({value: sendValue})
          const transactionResponse = await fundMe.withdraw()
          await transactionResponse.wait(1)

          const endingBalance = await fundMe.provider.getBalance(fundMe.address)
          assert.equal(endingBalance.toString(), "0") 
      })
    })
