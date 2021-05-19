import React, { useState } from 'react'
import './Login.css'
import { loginUrl } from './spotify'
import logo from './images/spotilyLogo.png'



export default function Login() {
    console.log(loginUrl)
    return (
        <div className="login">
            {/* Spotify Log in  */}
            <h1>Log in Component</h1>
            <img src= {logo} alt=""></img>
                <a href={loginUrl}>Log into Spotify</a>
        </div>
        
    )
}
