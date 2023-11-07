import "./Vaults.scss";
import VaultList from "./VaultList";

const VaultProducts = ({ setChosenVault }) => {
  return (
    <>
      <div className="vault-name">
        <b>Vaults</b>
      </div>
      <div className="vault-index-parent">
        <div id="vault-index">BaseAsset</div>
        <div id="vault-index">TVL</div>
        <div id="vault-index">Expiry</div>
      </div>
      <VaultList setChosenVault={setChosenVault} />
    </>
  );
};

export default VaultProducts;
