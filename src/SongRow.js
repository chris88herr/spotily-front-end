import React from 'react'
import "./SongRow.css"

export default function SongRow({selected, track, selectFunc}) {
    const selectedClassName = selected? " selected" : "";
    return (
        <div className={"song_row"+selectedClassName} onClick={selectFunc}>
            <img className="song_album" src={track.album.images[0].url} alt=""/>
            <div className="song_info">
                <h1>{track.name}</h1>
                <p>{track?.artists.slice(0,1).map(artist => artist.name).join(", ")}
                </p>
            </div>

            
        </div>
    )
}
