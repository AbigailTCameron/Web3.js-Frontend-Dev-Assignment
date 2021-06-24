import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Header from './components/Header'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
    selectAddress, selectAmount, selectCrypto, selectCryptoAddress, selectSendAddress,
    setHashCode,
    setStatus
} from './accountSlice';

function Submit() {
    const cryptoAddress = useSelector(selectCryptoAddress);
    const sendAddress = useSelector(selectSendAddress);
    const amount = useSelector(selectAmount);
    const crypto = useSelector(selectCrypto);
    const address = useSelector(selectAddress);
    const weenusContract = "0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA";
    const rETHContract = "0x62BC478FFC429161115A6E4090f819CE5C50A5d9";
    let txHash;


    const dispatch = useDispatch();
    const router = useRouter();


    const main = async (e) => {
        e.preventDefault();

        try {
            if (crypto === "rETH") {
                web3.eth.sendTransaction({
                    from: cryptoAddress.toString(),
                    to: sendAddress.toString(),
                    value: web3.utils.toWei(amount.toString(), 'ether'),
                    address: rETHContract,
                    chainId: '0x3'
                })
                    .on('transactionHash', function (hash) {
                        txHash = hash.substring(0, 10) + "..." + hash.toString().substring(hash.length - 1, hash.length - 11)
                        dispatch(setHashCode(txHash))
                    })
                    .on('receipt', function (receipt) {
                        if (!receipt.status) {
                            dispatch(setStatus("Transaction Failed"))
                        } else if (receipt.status) {
                            dispatch(setStatus("Confirmed Transaction!"))
                        }

                    })
                    .on('confirmation', function (confirmationNumber, receipt) {})
                    .on('error', function(error){
                        dispatch(setStatus("Transaction Failed"))
                        console.error}); // If a out of gas error, the second parameter is the receipt.
            } else if (crypto === "WEENUS") {

               
                var abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"drip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]
                
                var myContract = new web3.eth.Contract(abiArray, weenusContract, {
                    from: cryptoAddress.toString(),
                    gasPrice: '20000000000'
                })

                let tokenAmount = web3.utils.toWei(amount.toString(), 'ether')

                myContract.deploy({
                    data: myContract.methods.transfer(sendAddress.toString(), tokenAmount).encodeABI(), 
                 
                }).send({
                    from: cryptoAddress.toString(),
                    to: weenusContract.toString(),
                }, function(error, transactionHash){  })
                .on('error', function(error){ 
                    dispatch(setStatus("Transaction Failed"))
                    console.error
                 })
                .on('transactionHash', function(hash){ 
                    txHash = hash.substring(0, 10) + "..." + hash.toString().substring(hash.length - 1, hash.length - 11)
                        dispatch(setHashCode(txHash))
                     
                })
                .on('receipt', function(receipt){
                    if (!receipt.status) {
                        dispatch(setStatus("Transaction Failed"))
                    } else if (receipt.status) {
                        console.log(receipt)
                        dispatch(setStatus("Confirmed Transaction!"))
                    }
               
                })
                .on('confirmation', function(confirmationNumber, receipt){ })
            

                

               
            }


        } catch (err) {
            console.log(`Transaction Error! Try again some other time.`)

        }

        router.push(`/confirm`);

    };


    function disconnect(e) {
        e.preventDefault();
        router.push(`/`);
    }




    return (
        <div className="h-screen bg-black-primary ">
            <Head>
                <title>Review Transaction</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header address={ address } connected={ address !== "Engage Wallet" } disconnect={ disconnect } />

            <div className="bg-black-bubble border border-black-outline mt-10 text-white rounded-3xl sm:w-2/3  max-w-sm mx-auto">
                <form onSubmit={ main }>
                    <p className="mt-8 text-3xl font-semi-bold text-center">Review Transaction</p>

                    {/* List the assets and give a choice of which asset to choose. Display balance of each asset */ }
                    <p className="text-center mt-10 text-2xl font-medium">SEND</p>
                    <p className="text-center text-2xl font-medium">{ amount } { crypto }</p>

                    {/* List the assets and give a choice of which asset to choose. Display balance of each asset */ }
                    <p className="title mt-8 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm" >From: { cryptoAddress }</p>
                    <div className="flex justify-center">
                        <Image
                            src="/arrow.png"
                            width={ 300 }
                            height={ 100 }
                        />
                    </div>



                    <p className="title mt-1 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm">To: { sendAddress }</p>


                    <div className="text-black-header text-center mt-6 mb-6">
                        <button className="button" type="submit" onClick={ main } >
                            CONFIRM
                        </button>
                    </div>

                </form>
            </div>



        </div>
    )
}

export default Submit
