import React, { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setAccount } from "../redux/slices/accountSlice";

const Navbar: React.FC = () => {
  const account = useAppSelector((state) => state.account.account);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      // const account = await getAccount();
      // setAccount(account);
    })();
  }, [account]);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
    if (account) {
      dispatch(setAccount(""));
    } else {
      await connectWallet();
      const myAccount = await getAccount();
      dispatch(setAccount(myAccount));
    }

  };

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          Tezos Lottery
        </a>
        <div className="d-flex" onClick={onConnectWallet}>
          {/* TODO 4.b - Call connectWallet function onClick  */}
          <button className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            {account ? account?.substring(0, 3) + "..." + account?.slice(-5) : "Connect Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
