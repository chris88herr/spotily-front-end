import React from 'react'
import "./ArtistsContainer.css"
import { useDataLayerValue } from './DataLayer'

export default function ArtistsContainer({artists, handleArtistSelection}) {
    const [{artist_filter}, dispatch] = useDataLayerValue()
     
    return (
        <div>
            
            <h1>ON THIS PLAYLIST</h1>
       
        <div className="artists_container">
            
            {artists && artists.map(artist => {
            return (<div key={artists.indexOf(artist)} 
                className={"single_artist_container"} 
                onClick={()=>handleArtistSelection(artist?.name)}>
                <img src={artist?.images[2].url} alt=""/>
                <p>{artist.name}</p>
            </div>)
        })}
            
        </div>
        </div>
    )
}
