import React, {useState, useEffect} from 'react'

import {formatString} from './Utils/utils.js';
import "./LyricsModal.css"
import { useDataLayerValue } from './DataLayer.js';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));

export default function LyricsModal({showModal, hideFunc}) {
    const [{trackSelected},  dispatch] = useDataLayerValue();
    const [songLyrics, setLyrics] = useState("No Lyircs")
    const [isLoading, setLoading] = useState(false);
    const lyricsBaseUrl  = new URL("https://spotilyrics-app.herokuapp.com/songLyrics");
    const classes = useStyles();

    useEffect(()=>{
        if(trackSelected){
        const songName = trackSelected?.track?.name;
        const songArtist = trackSelected?.track?.artists[0]?.name;
        lyricsBaseUrl.searchParams.append("artist", songArtist);
        lyricsBaseUrl.searchParams.append("songName",songName);
        setLoading(true)
        console.log(lyricsBaseUrl)
        fetch(lyricsBaseUrl)
        .then(res => res.json()        )
        .then(data=>{
            if(data){
                setLyrics(data.lyrics)
            }
            else {
                setLyrics("no lyrics")
            }
            setLoading(false)
        })
        .catch(e=>{setLyrics("No Lyrics")
            setLoading(false)
    });
        }
    }, [trackSelected])

    const showClassName = showModal ? " display-block" : " display-none";
    let ids = 0;
    const getId = ()=>{
        ids +=1;
        return ids
    }
    return (
        <div className={"lyrics_modal"+ showClassName}>
            <div className ="lyrics">
                <div className ="lyrics_title"> {trackSelected?.track?.name} </div>
                <div className =" lyrics_modal_lyircs">
                    { !isLoading ? formatString(songLyrics, 7).map(piece=>(
                        <p key={getId()}>{piece}</p>
                        )) :     <div className={classes.root}>
                                    <CircularProgress />
                                     </div>
                    }
                </div>
            </div>
        </div>
    )
}
