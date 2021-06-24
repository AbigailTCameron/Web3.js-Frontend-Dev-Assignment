import Head from 'next/head';
import React from 'react'
import AmountButton from './components/AmountButton';
import SplitButton from './components/SplitButton';
import { useState, useRef } from 'react';
import Header from './components/Header';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import {
  setCryptoAddress, setCrypto, setrETHBalance, setWeenusBalance, setAmount, setSendAddress, setAddress,
  selectrETHBalance, selectCrypto, selectWeenusBalance, selectAmount, selectSendAddress, selectAddress
} from './accountSlice';




export default function Home() {
  const dispatch = useDispatch();
  const crypto = useSelector(selectCrypto);
  const rETHBalance = useSelector(selectrETHBalance);
  const weenusBalance = useSelector(selectWeenusBalance);
  const amount = useSelector(selectAmount);
  const address = useSelector(selectAddress);

 
  var abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"drip","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]

  const [ percent, setPercent ] = useState(null);


  const searchInputRef = useRef(null);
  const router = useRouter();
  //navigates to the submit page
  const submit = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;
    dispatch(setSendAddress(term));

    if (!term) return;
    router.push(`/submit?term=${ term }`);
  }


  //connects to the metamask wallet
  const Web3 = require("web3");
  const connectWallet = async () => {
    let accountString;
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then(accounts => {
        if (accounts[ 0 ].length > 10) {
          accountString = accounts[ 0 ].substring(0, 4) + "..." + accounts[ 0 ].toString().substring(accounts[ 0 ].length - 1, accounts[ 0 ].length - 5);
        }
        
        dispatch(setCryptoAddress(accounts))
        dispatch(setAddress(accountString));
        updateBalance(accounts[ 0 ]);
      });
      return true;
    } else {
      alert("Metamask extension not detected!")
    }
  }


  //disconnect from the wallet
  async function disconnect() {
    if (ethereum.isConnected) {
      ethereum.on('disconnect', window.location.reload());
    }
  }

  

  const weenusContract = "0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA"
  //updates the balance of the tokens
  const updateBalance = async (cryptoAddress) => {
    
    await web3.eth.getBalance(cryptoAddress).then(value => {
      var rethval = web3.utils.fromWei(value)
      dispatch(setrETHBalance(rethval));
    })

    const tokenInst = new web3.eth.Contract(abiArray, weenusContract);
    await tokenInst.methods.balanceOf(cryptoAddress).call().then(function(val){
      var str = web3.utils.fromWei(val);
      dispatch(setWeenusBalance(str))
      });
 
  }


  const calculateAmount = (per) => {
    if (crypto === "rETH") {
      setPercent(per)
      dispatch(setAmount((per / 100) * rETHBalance));
    } else {
      setPercent(per)
      dispatch(setAmount((per / 100) * weenusBalance));
    }
  }

  const handleState = (e) => {
    setPercent(0);
    dispatch(setAmount(e));
  }



  return (
    <div className="h-screen bg-black-primary ">
      <Head>
        <title>Sovryn</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*Header with the connect to wallet button and Sovryn logo*/ }
      <Header address={ address } connected={ address !== "Engage Wallet" } disconnect={ disconnect } onClick={ connectWallet } />





      {/*Body */ }
      <div className="bg-black-bubble border border-black-outline mt-10 text-white rounded-3xl sm:w-1/2  max-w-sm mx-auto">
        <p className="mt-8 text-3xl font-semi-bold text-center">SEND</p>

        {/* List the assets and give a choice of which asset to choose. Display balance of each asset */ }
        <p className="title">Asset:</p>
        <div className="flex flex-row justify-center mt-2">
          <SplitButton
            onClick={ (e) => dispatch(setCrypto('rETH')) }
            src="/eth.png"
            width={ 25 }
            height={ 25 }
            title="rETH"
            active={ crypto === "rETH" }
          />
          <SplitButton
            onClick={ (e) => dispatch(setCrypto("WEENUS")) }
            src="/muscle.png"
            width={ 23 }
            height={ 23 }
            title="WEENUS"
            active={ crypto === "WEENUS" }
          />
        </div>
        <p className="title text-xs mt-2">Available Balance: { crypto === "rETH" ? rETHBalance : weenusBalance } { crypto }</p>


        {/*Display the amount of each asset and how much you wish to send */ }
        <p className="title mt-8">Amount:</p>
        <div type="submit">
          <div className="flex flex-row justify-center mt-2 align-middle">

            <input className="rounded-md text-black-header p-2 w-full ml-8 mr-8 text-center focus:outline-none appearance-none"
              type="number"
              placeholder="0"
              required id="amount"
              onChange={ (e) => handleState(e.target.value) }
              value={ amount } />
            
          </div>

          <div className="flex flex-row justify-center mt-2">
            <AmountButton title="10%" onClick={ (e) => calculateAmount(10) } active={ percent === 10 } />
            <AmountButton title="25%" onClick={ (e) => calculateAmount(25) } active={ percent === 25 } />
            <AmountButton title="50%" onClick={ (e) => calculateAmount(50) } active={ percent === 50 } />
            <AmountButton title="75%" onClick={ (e) => calculateAmount(75) } active={ percent === 75 } />
            <AmountButton title="100%" onClick={ (e) => calculateAmount(100) } active={ percent === 100 } />
          </div>




          <p className="title mt-8">Send to:</p>

          <div className="flex flex-row justify-center mt-2">
            <input
              className="rounded-md text-black-header p-2 w-full ml-8 mr-8 text-center focus:outline-none appearance-none"
              ref={ searchInputRef }
              type="text"
              required id="Send Address"
              placeholder="Type or Paste address" />
          </div>

          <div className="text-black-header text-center mt-6 mb-6">
            <button className="button" type="submit" onClick={ submit } >
              SUBMIT
            </button>
          </div>

        </div>

      </div>




    </div>
  )
}
