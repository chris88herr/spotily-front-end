import React from 'react'
import "./ArtistsContainer.css"

export default function ArtistsContainer({artists, handleArtistSelection, children}) {
    if(artists?.length>0)  
     return (
        <div>
            {children}
        <div className="artists_container">
            {artists && artists.map(artist => {
            return (<div key={artists.indexOf(artist)} 
                className={"single_artist_container"} 
                onClick={()=>handleArtistSelection(artist)}>
                <img src={artist?.images[2]?.url} alt=""/>
                <p>{artist.name}</p>
            </div>)
        })}
            
        </div>
        </div> 
    ); else return null;
}
