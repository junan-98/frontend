import eth_logo from "../icons/ethereum-logo.png";
import usdc_logo from "../icons/usdc.svg";
import './BalanceItem.scss';

const BalanceItem = ({ balance }) => {
  return (
    <div id="balance-item">
      <div id="asset-image">
        {balance.asset === "ETH" ? (
          <img src={eth_logo} alt="ETH" />
        ) : (
          <img src={usdc_logo} alt="USDC" />
        )}
      </div>
      <div id="asset-amount">{balance.balance} {balance.asset}</div>
    </div>
  );
};

export default BalanceItem;
