import React, { useEffect, useState } from "react";
import './App.css';
import Connect from "./components/Connect/Connect";
import Wave from "./components/Wave/Wave";

export default function App() {
    const [currentAccount, setCurrentAccount] = useState("");

    /* window.ethereumにアクセスできることを確認します */
    const checkIfWalletIsConnected = async () => {
        try {
        const { ethereum }:any = window;
        if (!ethereum) {
            console.log("Make sure you have MetaMask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }
        /* ユーザーのウォレットへのアクセスが許可されているかどうかを確認します */
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account", account);
            setCurrentAccount(account);
        } else {
            console.log("No authorized accounts found");
        }
        } catch (error) {
            console.log(error);
        }
    };

  /**
   * WEBページがロードされたときに下記の関数を実行します。
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="hand-wave">
          👋
        </span>{" "}
        WELCOME!

        </div>
        <div className="bio">
          イーサリアムウォレットを接続して、メッセージを作成したら,
          <span role="img" aria-label="hand-wave">
            👋
          </span>を送ってください<span role="img" aria-label="shine">
            ✨
          </span>
        </div>


        <Wave/>

        {/* ウォレットコネクトのボタンを実装 */}
        <Connect/>
      </div>
      
    </div>
  );
}

