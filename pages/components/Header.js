import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Header({ address, connected, disconnect, returnToHome, ...props }) {
    const router = useRouter();

    return (
        <header className="flex w-full justify-between h-18 bg-black-header">
            <div className="mt-2 ml-4 cursor-pointer" onClick={ () => router.push(`/`) }>
                <Image
                    className=""
                    src="/logo@2x.png"
                    width={ 270 }
                    height={ 40 }

                />
            </div>

            { connected ?

                <div className="flex mr-4 mt-2 mb-2 align-middle justify-center">
                    <div className="bg-black-dark rounded-l-xl text-white text-center">
                        <button className="px-6 py-2 rounded-l-xl focus:outline-none cursor-default" >
                            { address }
                        </button>
                    </div>



                    <div className="flex align-middle text-yellow-primary justify-center w-8 bg-black-crypto rounded-r-xl cursor-pointer" onClick={ disconnect }>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>


                </div>

                :


                <div className="flex text-yellow-primary text-center mr-4 mt-2 mb-2">
                    <button className="px-6 py-2 cursor-pointer border border-yellow-primary rounded-xl focus:outline-none" onClick={ props.onClick }>
                        { address }
                    </button>
                </div>
            }



        </header>
    )
}

export default Header
