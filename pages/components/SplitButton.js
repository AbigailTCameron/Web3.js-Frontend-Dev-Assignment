import React from 'react'
import Image from 'next/image';

function SplitButton({title, src, width, height, active, ...props}) {
    return (
        <button className={`split-button flex flex-row justify-center ${active && "bg-blue-outline bg-opacity-50"}`} onClick={props.onClick}>
          
            <Image 
                src={src}
                width={width}
                height={height}
                className=""
            />
            {title}
            
        </button>
    )
}

export default SplitButton
