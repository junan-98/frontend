import { ethers } from "ethers";
import { approveUSDC, allowanceUSDC, RPC } from "./transaction";
import { switchToPolygonMumbai } from "./wallet";

const DOV_ABI= [
    "function purchase(uint strikeIndex, uint amount, address to) external returns (uint premium)",
    "function _calculatePremium(uint optionPrice, uint amount) public view returns(uint premium) ",
    "function deposit(uint _strikeIndex, uint amount, address to) external returns (uint tokenId)"
];  
  

export async function purchaseOption(address, strikeIndex, amount, setTradingStatus) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const amountToApprove = ethers.utils.parseUnits("100", 6); // 100 USDC

    console.log("approve", amountToApprove);
    await approveUSDC(signer, address, amountToApprove);

}

export async function depositOption(address, strikeIndex, amount, setTradingStatus) {
    console.log('writeOption', address, strikeIndex, amount);
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const clientAddress = await signer.getAddress();

        setTradingStatus('trade')
        // check allowance
        const allowance = await allowanceUSDC(signer, clientAddress, address);
        console.log('allowance: ', Number(allowance));
        
        if(Number(allowance) < Number(amount) * 1000000) {
            try{
                // approve
                const amountToApprove = Number(amount) * 1000000 - Number(allowance)
                console.log('approve', amountToApprove)
                await approveUSDC(signer, address, amountToApprove);
            } catch(e) {
                console.error('error in approve', e);
                setTradingStatus('default');
                return;
            }
        }
        
        const contract = new ethers.Contract(address, DOV_ABI, signer);
        
        const txn = await contract.deposit(strikeIndex, ethers.utils.parseEther(amount), clientAddress);
        await txn.wait();
  
        console.log("Deposit successful:", txn.hash);
      } catch (error) {
        console.error("Error in deposit:", error);
    } finally {
        setTradingStatus('default');
    }
}   