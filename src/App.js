import React, {useState, useEffect} from "react"
import './App.css';
import Login from './Login.js'
import Footer  from "./Footer"
import MainScreen from "./MainScreen";
import LyricsModal from "./LyricsModal";
import Sidebar from './Sidebar';
import Search from './Search'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'; 
import {useDataLayerValue} from "./DataLayer"
import { getTokenFromSpotify } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js"
import PlayerBody from "./PlayerBody";

const spotify = new SpotifyWebApi();

const getUserPlaylistsHandler = (token)=>{
  const url = new URL("https://api.spotify.com/v1/me/playlists");
  url.searchParams.append("limit", 50);
  return fetch(url, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }}).then(res => res.json())
}
const getSinglePlaylist = (token, playlist)=>{
  const url = new URL(`https://api.spotify.com/v1/playlists/${playlist?.id}`);
  return fetch(url, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }}).then(res => res.json())
}

function App() {
  const [{user, token, spotify_player }, dispatch] = useDataLayerValue();

  window.onSpotifyWebPlaybackSDKReady = () =>{
    if(token){
    const player = new window.Spotify.Player({
      name:'Spotilyrics player',
      getOAuthToken: cb => {
        console.log("setting:"+token)
        cb(token);
      }
    })
    player.addListener('initialization_error', ({ message }) => { console.error("init_err: "+message); });
    player.addListener('authentication_error', ({ message }) => { console.error("auth_err:"+message); });
    player.addListener('account_error', ({ message }) => { console.error("acc_err: "+message); });
    player.addListener('playback_error', ({ message }) => { console.error("pb err: "+message); });

    // Playback status updates
    // player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      dispatch({
        type: "SET_PLAYER_ID",
        player_id : device_id,
      });
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    dispatch({
      type: "SET_PLAYER",
      player: player
    })
    player.connect().then(console.log(player))
  }}

  useEffect(()=>{
    const hash = getTokenFromSpotify();
    window.location.hash = "";
    const _token = hash.access_token;    

    if(_token){
      spotify.setAccessToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token : _token,
      });
      spotify.getMe().then(user=>{
        dispatch({
          type: 'SET_USER',
          user: user
        });

      });
      getUserPlaylistsHandler(_token).then(playlists => {
        console.log(playlists)
        dispatch ({
          type:"SET_PLAYLISTS",
          playlists: playlists,
        });
        getSinglePlaylist(_token, playlists?.items[0]).then(data=>dispatch({
          type:"SET_CURRENT_PLAYLIST",
          playlist: data
        }))
      })

    }

  },[]);

  const [showModal, setShowModal] = useState(false);
  const hideModalHandler = () => {
      setShowModal(false);
  }
  const toggleModal = () => {
      setShowModal(!showModal);
  }

  return (
    <Router>
      <div className="App">
          {
            token ? (
              <> 
              <LyricsModal showModal={showModal} hideFunc={hideModalHandler} ></LyricsModal>
                
                  <MainScreen>
                    <Sidebar/>
                    
                    <Route exact path = "/" render={(props)=>(
                      <PlayerBody/>)}/>  
                    <Route path ="search" component={Search}/>

                     <Footer showModalFunc = {toggleModal}/>
                  </MainScreen>
                </>
            )
            : (<Login/>)
          }
      </div>
    </Router>
  );
}

export default App;
