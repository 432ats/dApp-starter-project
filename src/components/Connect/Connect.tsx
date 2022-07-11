import React, { useState } from 'react'




function Connect() {
    /* ユーザーのパブリックウォレットを保存するために使用する状態変数を定義します */
    const [currentAccount, setCurrentAccount] = useState("");
    console.log("currentAccount :", currentAccount);

    

    // connectWalletメソッドを実装
    const connectWallet = async () => {
        try {
        const { ethereum }:any = window;
        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log("Connected :", accounts[0]);
        setCurrentAccount(accounts[0]);

        } catch (error) {
        console.log(error);
        }
    };

    return (
        <>
        <div>Connect</div>
        {/* ウォレットコネクトのボタンを実装 */}
        {!currentAccount && (
            <button className="connectButton" onClick={connectWallet}>
                Connect Wallet
            </button>
            )}
            {currentAccount && (
            <button className="connectButton" onClick={connectWallet}>
                Wallet Connected
            </button>
        )}
        </>
    )
}

export default Connect