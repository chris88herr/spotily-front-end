import React from 'react'


import "./MainScreen.css"

export default function MainScreen(props) {
    return (
        <div className="main_screen">
            {props.children}
        </div>
    )
}
