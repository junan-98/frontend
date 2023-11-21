import { ethers } from "ethers";
import { approveUSDC, allowanceUSDC } from "./tokenTransaction";
import { updateOrders, updateSettled } from "./api";

const DOV_ABI= [
    "function purchase(uint strikeIndex, uint amount, address to) external returns (uint premium)",
    "function _calculatePremium(uint optionPrice, uint amount) public view returns(uint premium) ",
    "function deposit(uint _strikeIndex, uint amount, address to) external returns (uint tokenId)",
    "function settle(uint strikeIndex, uint amount, uint round, address to) external returns (uint pnl) ",
    "function withdraw(uint tokenId, address to) external returns(uint256 writerPnl)",
    "function getAvailable(uint round) external view returns(uint available0, uint available1, uint available2, uint available3)"
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
    
        const tmp = await allowanceUSDC(signer, clientAddress, address);
        const allowance = Number(tmp._hex);
        console.log('allowance: ', Number(allowance));
    
        // check premium to pay
        const contract = new ethers.Contract(address, DOV_ABI, signer);
        
        // 그냥 프리미엄은 트랜잭션 보내서 프리미엄 계산하지 말고 내부적으로 계산
        const premium = Number(amount) * Number(optionPrice) * 1000000;
        console.log('premium to pay:', premium);
        if (Number(premium) > Number(allowance)) {
            try{
                // approve
                await approveUSDC(signer, address, premium);
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
        setTradingStatus('default');
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
        const tmp = await allowanceUSDC(signer, clientAddress, address);
        const allowance = Number(tmp._hex);
        console.log('allowance: ', Number(allowance));

        const collateral = Number(amount) * 10**6 * Number(tradeProduct.strikePrice);
        console.log('collateral', collateral);
        if(Number(allowance) < collateral) {
            try{
                await approveUSDC(signer, address, collateral);
            } catch(e) {
                console.error('error in approve', e);
                setTradingStatus('default');
                return;
            }
        }
        
        const contract = new ethers.Contract(address, DOV_ABI, signer);
        
        console.log(ethers.utils.parseUnits(collateral.toString(), 12));
        const txn = await contract.deposit(strikeIndex, ethers.utils.parseUnits(collateral.toString(), 12), clientAddress);
        const receipt = await txn.wait();
        const tokenId = Number(receipt.logs[2].topics[3]);
        setTradingStatus('default');
        console.log("receipt:", receipt);
        console.log('tokenId:', tokenId);

        // update trade info
        updateOrders(clientAddress, 'write', amount, tradeProduct, tokenId);
        
      } catch (error) {
        setTradingStatus('default');
        console.error("Error in deposit:", error);
    } 
}

// settle(uint strikeIndex, uint amount, uint round, address to)
export async function settle(position) {
    try{
        const contractAddress = position.option.optionAddress;
        const amount = ethers.utils.parseEther(position.amount.toString());
        const round = position.round;
        // need update api
        const strikeIndex = position.strikeIndex;
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const clientAddress = await signer.getAddress();
        
        console.log('settle param check', strikeIndex, amount, round, clientAddress);
        // const contract = new ethers.Contract(contractAddress, DOV_ABI, signer);
        // const txn = await contract.settle(strikeIndex, amount, round, clientAddress);
        // await txn.wait();
        
        // update backend
        updateSettled(position.orderId);
    } catch(error) {
        console.log('ERROR WHILE SETTLE', error);
    }
    
}

//withdraw(uint tokenId, address to) external returns(uint256 writerPnl)
export async function withdraw(position) {
    try{
        const contractAddress = position.option.optionAddress;
        // need update api
        const tokenId = position.tokenId;
        
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const clientAddress = await signer.getAddress();
        
        console.log('settle param check', tokenId, clientAddress);
        // const contract = new ethers.Contract(contractAddress, DOV_ABI, signer);
        // const txn = await contract.withdraw(tokenId, clientAddress);
        // await txn.wait();

        updateSettled(position.orderId);
    } catch(error) {
        console.log('ERROR WHILE SETTLE', error);
    }
}

const normalizeDecimal = (avaialbe) => {
    return Number(avaialbe) / 10 ** 18;
}

export async function getAvailable(vault, round, setAvailables) {
   try {
        console.log(1);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(1);
        const contract = new ethers.Contract(vault[0].address, DOV_ABI, signer);
        const result = await contract.getAvailable(round)
        const avaialbes = result.map(normalizeDecimal);
        console.log('available reuslt', avaialbes);
        for (let i = 0; i < avaialbes.length; i++) {
            avaialbes[i] = avaialbes[i] / Number(vault[i].strikePrice);
        }
        
        setAvailables(avaialbes);

   } catch(error) {
        console.error("ERROR FETCHING AVAILABLE", error);
   }
}