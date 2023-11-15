import { ethers } from "ethers";
import { approveUSDC, allowanceUSDC, RPC } from "./tokenTransaction";
import { switchToPolygonMumbai } from "./wallet";
import { updateOrders } from "./api";

const DOV_ABI= [
    "function purchase(uint strikeIndex, uint amount, address to) external returns (uint premium)",
    "function _calculatePremium(uint optionPrice, uint amount) public view returns(uint premium) ",
    "function deposit(uint _strikeIndex, uint amount, address to) external returns (uint tokenId)",
    "function settle(uint strikeIndex, uint amount, uint round, address to) external returns (uint pnl) ",
    "function withdraw(uint tokenId, address to) external returns(uint256 writerPnl)"
];  
  

export async function purchaseOption(tradeProduct, amount, setTradingStatus) {
    const address = tradeProduct.address
    const optionPrice = tradeProduct.optionPrice
    const strikeIndex = tradeProduct.strikeIndex
    console.log('purchase optoin', address, optionPrice, strikeIndex, amount, setTradingStatus);
    try{
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const clientAddress = await signer.getAddress();
        setTradingStatus('trade');
    
        const allowance = await allowanceUSDC(signer, clientAddress, address);
        console.log('allowance: ', Number(allowance));
    
        // check premium to pay
        const contract = new ethers.Contract(address, DOV_ABI, signer);
        // const premium = await contract._calculatePremium(ethers.utils.parseUnits(optionPrice, 6), ethers.utils.parseEther(amount));
        // 그냥 프리미엄은 트랜잭션 보내서 프리미엄 계산하지 말고 내부적으로 계산
        const premium = Number(amount) * Number(optionPrice) * 1000000;
        console.log('premium to pay:', premium);
        if (Number(premium) > Number(allowance)) {
            try{
                // approve
                const amountToApprove = Number(premium) - Number(allowance)
                console.log('approve', amountToApprove)
                await approveUSDC(signer, address, amountToApprove);
            } catch(e) {
                console.error('error in approve', e);
                setTradingStatus('default');
                return;
            }
        }
        const txn = await contract.purchase(strikeIndex, ethers.utils.parseEther(amount), clientAddress);
        await txn.wait();
        setTradingStatus('default');
        console.log("Purchase successful:", txn.hash);

        // update trade info
        updateOrders(clientAddress, 'purchase', amount, tradeProduct);
        
    } catch(error) {
        console.error("Error in deposit:", error);
    } 
}

export async function depositOption(tradeProduct, amount, setTradingStatus) {
    const address = tradeProduct.address
    const strikeIndex = tradeProduct.strikeIndex
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
        setTradingStatus('default');
        console.log("Deposit successful:", txn.hash);

        // update trade info
        updateOrders(clientAddress, 'write', amount, tradeProduct);
        
      } catch (error) {
        console.error("Error in deposit:", error);
    } 
}   