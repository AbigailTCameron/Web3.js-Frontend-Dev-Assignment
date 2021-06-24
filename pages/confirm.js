import React, { useState } from 'react';
import Head from 'next/head';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import { selectAddress, selectHashCode, selectStatus } from './accountSlice';
import { useRouter } from 'next/router';
import Image from 'next/image';



function confirm() {
    const address = useSelector(selectAddress);
    const hashCode = useSelector(selectHashCode);
    const status = useSelector(selectStatus);


    const router = useRouter();
    const close = (e) => {
        e.preventDefault();
        router.push(`/`);
    }



    return (
        <div className="h-screen bg-black-primary ">

            <Head>
                <title>Confirm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header address={ address } connected={ address !== "Engage Wallet" } disconnect={ close } />

            <div className="bg-black-bubble border border-black-outline mt-10 text-white rounded-3xl sm:w-2/3  max-w-sm mx-auto">

                <p className="mt-8 text-3xl font-semi-bold text-center">Transaction Details</p>
                <div className="flex mt-4 justify-center">
                    <Image
                        src="/check.png"
                        width={ 60 }
                        height={ 60 }
                    />

                </div>

                <p className="text-center font-light italic text-sm">{ status }</p>

                <div className="flex">
                    <p className="title mt-8 text-xs">Tx Hash:</p>
                    <p className="text-yellow-primary title mt-8 text-xs">{ hashCode }</p>
                </div>



                <div className="text-yellow-primary text-center mt-2 mb-2">
                    <button className="px-6 py-2 cursor-pointer font-bold border border-yellow-primary rounded-xl focus:outline-none" onClick={ close }>
                        CLOSE
                    </button>
                </div>


            </div>

        </div>
    )
}

export default confirm
