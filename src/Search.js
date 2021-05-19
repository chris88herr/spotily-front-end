import React, {useState, useEffect} from 'react'
import { useDataLayerValue } from './DataLayer'
import Header from './Header'
import ArtistsContainer from "./ArtistsContainer";
import SongsBody from './SongsBody'

import './Search.css'

const searchUrl = new URL("https://api.spotify.com/v1/search")
const searchQueryHandler = (query, token) =>{
    const results = []
    searchUrl.searchParams.set('q', query);
    searchUrl.searchParams.set('type', 'artist');
    searchUrl.searchParams.set('limit', 5);
    results.push(fetch(searchUrl, {
        headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()));
    searchUrl.searchParams.set('type', 'track')
    searchUrl.searchParams.set('limit', 10)
    results.push(fetch(searchUrl, {
        headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()));
    return results;
}

const setArtistsAndTracks = (promises, setArtists, setTracks) =>{
    if(!promises){
        console.log("no data")
        return;
    }

     promises[0]?.then(artists => {
         console.log(artists?.artists?.items)
        setArtists(artists?.artists?.items)
     });
     promises[1]?.then(tracks => {
        console.log(tracks)
        setTracks(tracks)
     });

}



const startSongPlayback = (song, token, player_id, spotify_player, volume) =>{
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player_id}`,
    {
        method: "PUT",
        body: JSON.stringify({
            uris: [song.uri]
        }),
        headers : {
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    }).then(() => { 
        spotify_player.setVolume(volume)
        spotify_player.resume();
        }
    ).catch( (e) => console.log(e) )
}


export default function Search() {


    const [{token, player_id, spotify_player, volume}, dispatch] = useDataLayerValue()
    const [query, setQuery] = useState('');
    const [artists, setArtists] = useState([])
    const [tracks, setTracks] = useState([])
    const [artistsTracks, setArtistsTracks] = useState([])
    const selectTrack = (trackObj) => {
        dispatch({
          type: "SELECT_TRACK",
          track: trackObj,
          isPlaying: true
        });
        startSongPlayback(trackObj, token, player_id, spotify_player, volume);
      };

    const handleArtistSelected = (artist) =>{
        setArtistsTracks([])
        const url = new URL(`https://api.spotify.com/v1/artists/${artist?.id}/albums`)
        url.searchParams.append("limit", 5);
        fetch(url,{
            headers: {
                "Content-type": "application/json",
                Authorization : `Bearer ${token}`
            },
        }).then(res => res.json()).then(data => {
            const albumTracksPromises = data?.items?.map(album=>getAlbumsTracks(album))
            Promise.all(albumTracksPromises).then(albumsTracks => {
                albumsTracks.map(singleAlbum => artistsTracks.push.apply(artistsTracks, singleAlbum))
                const tracksTranformed  = {
                    tracks : {
                        items : artistsTracks
                    }
                }
                setTracks(tracksTranformed)
            })
            })
    }

    const getAlbumsTracks=(album)=>{
            return fetch(`https://api.spotify.com/v1/albums/${album?.id}/tracks`,{
                headers: {
                    "Content-type": "application/json",
                    Authorization : `Bearer ${token}`
                },
            } ).then(res => res.json()).then(data => {
                const results = data.items.map(track =>  getTrackInfo(track.id)) 
                return Promise.all(results).then(allTracks => allTracks)              
            })
        
    }

    const getTrackInfo = (track_id) => {
        return fetch(`https://api.spotify.com/v1/tracks/${track_id}`,{
            headers: {
                "Content-type": "application/json",
                Authorization : `Bearer ${token}`
            },
        } ).then(res => res.json()).then(track => {
            // console.log(track?.album?.name)
            return track
        })

    }

    

    useEffect(()=>{
        if (query.length>0){
            console.log("running")
            const results = searchQueryHandler(query, token);
            setArtistsAndTracks(results, setArtists, setTracks)
        }
    }, [query])
    return (
        <div className="search">
            <Header onSearch={setQuery}/>
            
            <ArtistsContainer artists={artists} handleArtistSelection={handleArtistSelected} >
                <h1>Artists</h1>
            </ArtistsContainer>
            
            <SongsBody data = {tracks} selectTrack = {selectTrack}><h1>Songs</h1></SongsBody>

        </div>
    )
}
