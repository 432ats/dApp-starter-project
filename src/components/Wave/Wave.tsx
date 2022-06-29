import { ethers } from 'ethers';
import React, { useState } from 'react'
import abi from '../../utils/WavePortal.json'

function Wave() {
     /**
     * デプロイされたコントラクトのアドレスを保持する変数を作成
     */
    const contractAddress = "0xf955Cd1ddbA49Aa29D5f52c916A19094d628a5D5";
    /**
     * ABIの内容を参照する変数を作成
     */
    const contractABI = abi.abi;

    const wave = async () => {
        try {
            const { ethereum }:any = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                let count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());
                console.log("Signer:", signer);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch(error) {
        console.log(error);
        }
    };

    return (
        <>
        <div>Wave</div>
        <button className="waveButton" onClick={wave}>
            Wave at Me
        </button>
        </>
    )
}

export default Wave