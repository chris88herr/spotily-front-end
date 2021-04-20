import React, {useState} from 'react'
import { useDataLayerValue } from './DataLayer'


export default function SidebarPlaylist({ onClick, playlist}) {
    const [{current_playlist, token}, dispatch]=useDataLayerValue()
    const selected_class = playlist?.id===current_playlist?.id ? "_selected" : "";

    return (
        <div className={"sidebar_single_playlist"+selected_class } onClick={onClick}>
            <img src={playlist?.images[0]?.url} alt ="no-img"></img>
        </div>
    )
}
