import React from 'react'
import './Sidebar.css'
import SidebarOption from "./SidebarOption"
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from './DataLayer';
import SpotifyWebApi from 'spotify-web-api-js';
import {Link} from 'react-router-dom';
import SidebarPlaylist from './SidebarPlaylist';
import ArtistsContainer from './ArtistsContainer';

export default function Sidebar() {
    const [{playlists}, dispatch] = useDataLayerValue();
    
    const playlistsComponents = playlists?.items?.map(playlist =>(
        <SidebarPlaylist key={playlist.id} playlist ={playlist} onClick={e=>handlePlaylistClick(e, playlist)}/>
    ));
    const handlePlaylistClick = (e, playlist) => {
        e.preventDefault();
        new SpotifyWebApi().getPlaylist(playlist.id).then(p=>{
            dispatch({
                type: 'SET_CURRENT_PLAYLIST',
                playlist: p,
            })
        })

    };
    return (
        <div className="sidebar">
            <img className ="sidebar_logo"
            src ="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt=""></img>
            <Link to= "/">
            <SidebarOption key='home' Icon={HomeIcon} title="Home"/>
            </Link>
            {/* <Link to ="/search">
            <SidebarOption key='search' Icon={SearchIcon} title="Search"/>
            </Link>
            <SidebarOption key='library' Icon={LibraryMusicIcon} title="Your Library"/> */}
            <br/>
            <strong className="sidebar_title">PLAYLISTS</strong>
            <hr/>
            <div className ="sidebar_playlists">{playlistsComponents}</div>
        </div>
    )
}
