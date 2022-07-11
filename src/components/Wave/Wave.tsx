import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
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

    /* すべてのwavesを保存する状態変数を定義 */
    const [allWaves, setAllWaves] = useState([]);
    const getAllWaves = async () => {
        const { ethereum }:any = window;

        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                /* コントラクトからgetAllWavesメソッドを呼び出す */
                const waves = await wavePortalContract.getAllWaves();
                /* UIに必要なのは、アドレス、タイムスタンプ、メッセージだけなので、以下のように設定 */
                const wavesCleaned = waves.map((wave: any) => {
                    return {
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000),
                        message: wave.message,
                    };
                });
                /* React Stateにデータを格納する */
                setAllWaves(wavesCleaned);
            } else {
                console.log("Ethereum object doesn't exist!");
            }

        } catch (error) {
            console.log(error);
        }
    };

    /**
    * `emit`されたイベントに反応する
    */
    useEffect(() => {
        let wavePortalContract: any;
        const onNewWave = (from: string, timestamp: number, message: string) => {
            console.log("NewWave", from, timestamp, message);
            setAllWaves((prevState) => [
                ...prevState,
                {
                    address: from,
                    timestamp: new Date(timestamp * 1000),
                    message: message,
                },
            ]);
        };
        /* NewWaveイベントがコントラクトから発信されたときに、情報を受け取ります */
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            wavePortalContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            wavePortalContract.on("NewWave", onNewWave);
        }
        /*メモリリークを防ぐために、NewWaveのイベントを解除します*/
        return () => {
            if (wavePortalContract) {
                wavePortalContract.off("NewWave", onNewWave);
            }
        };
    }, []);




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