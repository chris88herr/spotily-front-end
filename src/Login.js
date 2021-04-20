import React, { useState } from 'react'
import './Login.css'
import { loginUrl } from './spotify'
import axios from 'axios';



export default function Login() {
    console.log(loginUrl)
    return (
        <div className="login">
            {/* Spotify Log in  */}
            <h1>Log in Component</h1>
            <img src= "https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt=""></img>
                <a href={loginUrl}>Log into Spotify</a>
        </div>
        
    )
}
