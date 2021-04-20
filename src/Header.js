import React, {useState} from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search"
import {Avatar} from "@material-ui/core"
import {useDataLayerValue} from "./DataLayer"

export default function Header() {
    const [{user}, dispatch] = useDataLayerValue();
    const [iconDisplay, iconDisplayDispatch] =  useState(true);

    return (
        <div className="header">
            <div className="header_left">
                {iconDisplay && <SearchIcon/>}
                <input className="header_input"
                 placeholder="Search for artists, songs or albums"
                  type="text"
                  onFocus={(e)=>iconDisplayDispatch(false)}
                  onBlur={(e)=>iconDisplayDispatch(true)}/>


            </div>
            <div className="header_right">
                <Avatar src={user?.images[0]?.url} alt="RQ"/>
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}
