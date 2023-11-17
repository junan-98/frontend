import { ethers } from "ethers";

export const RPC = 'https://rpc-mumbai.maticvigil.com/';
export const USDC = '0xe059aA96255990826D0d62c62462Feea47AF82a7';
const USDC_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)"
];

export async function getUSDCBalance(address) {
  const provider = new ethers.providers.JsonRpcProvider(RPC);

  // ERC20 토큰 컨트랙트 객체 생성
  const tokenContract = new ethers.Contract(USDC, USDC_ABI, provider);

  // 주어진 주소의 토큰 잔액 조회
  const balance = await tokenContract.balanceOf(address);
  return balance;
}

export async function getMATICBalance(address) {
    try {
        // Polygon Mumbai 네트워크에 연결된 프로바이더 생성
        const provider = new ethers.providers.JsonRpcProvider(RPC);
    
        // 주어진 주소의 잔액 조회
        const balance = await provider.getBalance(address);

        console.log("MATIC Balance:", ethers.utils.formatEther(balance));
        return ethers.utils.formatEther(balance); // 잔액을 문자열 형태로 변환하여 반환
      } catch (error) {
        console.error("Error retrieving MATIC balance:", error);
        return "Error";
      }
}

export async function getPortfolioBalance(address){
    const matic_formatted = await getMATICBalance(address);
    const usdc = await getUSDCBalance(address);
    const usdc_formatted = ethers.utils.formatUnits(usdc.toString(), 6);
    return [
        {
            asset: 'ETH',
            balance: matic_formatted.substring(0,8)
        },
        {
            asset: 'USDC',
            balance: usdc_formatted.substring(0,8)
        }
    ];
}

export async function approveUSDC(signer, spender, amount) {
    // USDC 컨트랙트와 연결
    const usdcContract = new ethers.Contract(USDC, USDC_ABI, signer);
  
    // approve 함수 호출
    const tx = await usdcContract.approve(spender, amount);
    await tx.wait(); // 트랜잭션이 채굴될 때까지 기다림
}

export async function allowanceUSDC(signer, from, to) {
    const usdcContract = new ethers.Contract(USDC, USDC_ABI, signer);
    const allowance = await usdcContract.allowance(from, to);
    console.log(allowance);
    return allowance;
}