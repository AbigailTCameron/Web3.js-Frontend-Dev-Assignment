import React from 'react'

function AmountButton({title, active, ...props}) {
    return (
        <button className={`percent-button ${active && "bg-blue-outline bg-opacity-50"}`} onClick={props.onClick}>
            {title}
        </button>
    )
}

export default AmountButton
