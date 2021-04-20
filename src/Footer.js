import './Footer.css'

import React from 'react'
import RepeatIcon from "@material-ui/icons/Repeat";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import MusicNote from "@material-ui/icons/MusicNote";
import SkipIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayIcon from "@material-ui/icons/PlayArrow";
import {Grid, Slider} from "@material-ui/core"
import PlayListPlayIcon from "@material-ui/icons/PlaylistPlay"
import VolumeDownIcon from "@material-ui/icons/VolumeDown"
import { useDataLayerValue } from './DataLayer';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

export default function Footer({showModalFunc}) {
    const [{spotify_player, trackSelected, current_playlist, isPlaying, volume}, dispatch] = useDataLayerValue();
    const setPrevTrack = () => {
        const track = current_playlist?.tracks?.items?.find(item => item.track.name === trackSelected?.track.name);
        const index = current_playlist?.tracks?.items?.indexOf(track);
        if(index>0){
        const trackToSelect = current_playlist?.tracks?.items[index-1]
        dispatch({
            type:"SELECT_TRACK",
            track:trackToSelect
            })
        spotify_player.previousTrack();        
        }
    }
    const pausePlayBack = () => {
        spotify_player.pause();
        dispatch({
            type: "TOGGLE_PLAYBACK",
            isPlaying: false
        })
    }
    const resumePlayBack = () => {
        dispatch({
            type: "TOGGLE_PLAYBACK",
            isPlaying: true
        })
        spotify_player.resume()
    }
    const setVolume=(val)=>{
        if(val>0){
        spotify_player.setVolume(val/100)
        dispatch({
            type: "SET_VOLUME",
            volume: val/100
            })
        }
    }

const setNextTrack = () => {
    const track = current_playlist?.tracks?.items?.find(item => item.track.name === trackSelected?.track.name);
    const index = current_playlist?.tracks?.items?.indexOf(track);
    if(index < current_playlist?.tracks?.items?.length-1) {
        const trackToSelect = current_playlist?.tracks?.items[index+1]
        dispatch({
            type:"SELECT_TRACK",
            track: trackToSelect
        })
        spotify_player.nextTrack();        
        }
    }

    return (
        <div className="footer">
        <div className="footer_left">
            <img className="album_logo" src={trackSelected?.track?.album?.images[2]?.url} alt=""></img>
            <div className="footer_left_song_info">
                <h4>{trackSelected?.track?.name}</h4>
                <p>{trackSelected?.track?.artists[0]?.name }</p>
            </div>
        </div> 
        <div className="footer_center">
            {console.log(isPlaying)}
            <SkipPreviousIcon className ="skip_prev" onClick={()=>setPrevTrack()}/>
            {!isPlaying ? <PlayIcon fontSize = "large" className ="footer_green play" onClick={()=>resumePlayBack()}/>
            : <PauseCircleFilledIcon fontSize="large" onClick={()=>pausePlayBack()}/>}

            <SkipIcon className ="skip_next" onClick={()=>setNextTrack()}/>
            <div  onClick={()=>showModalFunc()}>
            <MusicNote/>
            </div>
        </div> 
            <div className="footer_right">
                <Grid container spacing={2}>

                <Grid item>
                    <VolumeDownIcon />
                </Grid>
                <Grid item xs>
                    <Slider value={volume*100} onChange={(e, val)=>setVolume(val)}  />
                </Grid>
                </Grid>
            </div>
        </div>
    )
}
