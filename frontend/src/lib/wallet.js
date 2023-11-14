import { ethers } from "ethers";
import { getUSDCBalance } from "./tokenTransaction";

const polygonMumbai = {
  chainId: "0x13881",
  chainName: "Mumbai Testnet",
  nativeCurrency: {
    name: "Mumbai Matic",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

export async function switchToPolygonMumbai() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [polygonMumbai],
      });
    } catch (switchError) {
      console.error("Error switching to Polygon Mumbai:", switchError);
    }
  }
}

export async function conWeb3(setWallet) {
  if (window.ethereum) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 80001) {
        // Mumbai Testnet의 Chain ID는 80001입니다.
        await switchToPolygonMumbai(); // 네트워크 전환 요청
      }

      await provider.send("eth_requestAccounts", []); // 지갑 연결 요청
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const maticBalance = await signer.getBalance();
      const usdcBalance = await getUSDCBalance(address);

      console.log("[WalletConnection]");
      console.log("Connected with account:", address);
      console.log("MATIC Balance:", maticBalance.toString());
      console.log("USDC Balance:", usdcBalance.toString());

      setWallet({
        ...setWallet,
        connected: true,
        address: address,
        matic: maticBalance.toString(),
        usdc: usdcBalance.toString(),
      });
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  } else {
    console.error("Ethereum wallet not detected");
  }
}
