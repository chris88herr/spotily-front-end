import React, { useEffect, useState } from "react";
import "./Body.css";
import Header from "./Header";
import SongRow from "./SongRow";
import ArtistsContainer from "./ArtistsContainer";
import { useDataLayerValue } from "./DataLayer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoritedIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import axios from "axios";

const getArtistInfo = (artistUrl, token) => {
  const options = {
    url: artistUrl,
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios(options)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export default function PlayerBody() {
  const [
    { trackSelected, current_playlist, token, player_id, spotify_player, artist_filter, volume },
    dispatch,
  ] = useDataLayerValue();
  const [artistsFromPlaylist, setArtistsFromPlaylist] = useState([]);
  const getUserPlaylistsHandler = (token)=>{
    const url = new URL("https://api.spotify.com/v1/me/playlists");
    url.searchParams.append("limit", 50);
    fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }}).then(res => res.json())
  }
  const handleArtistSelected = (artist)=>{
    if(artist===artist_filter)
        dispatch({
            type: "SET_ARTIST_FILTER",
            artist_filter:""
        })
    else  dispatch({
        type: "SET_ARTIST_FILTER",
        artist_filter:artist
    })
  }

  const selectTrack = (trackObj) => {
    const index = current_playlist?.tracks?.items?.indexOf(trackObj);
    dispatch({
      type: "SELECT_TRACK",
      track: trackObj,
    });
    startPlaylist(current_playlist, index);
  };

  const startPlaylist = (playlist, index) => {
    const context_uri = playlist?.uri;
    const offset = index ? index : 0;
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${player_id}`, {
      method: "PUT",
      body: JSON.stringify({
        context_uri: context_uri,
        offset: { position: offset },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        spotify_player.setVolume(volume);
        spotify_player.resume();
        dispatch({
          type: "SELECT_TRACK",
          track: current_playlist?.tracks?.items[index],
          isPlaying:true
        });
      })
      .catch((e) => console.log("error" + e));
  };

  const getPlaylistArtists = () => {
    const promises = [];
    const artistFetched = [];
    const items = current_playlist?.tracks?.items;

    if (items) {
      for (let item of items) {
        const artistObj = item.track.artists[0];
        if (!artistFetched.includes(artistObj.name)) {
          promises.push(getArtistInfo(artistObj.href, token));
          artistFetched.push(artistObj.name);
        }
      }
      return promises;
    }
  };

  useEffect(() => {
    Promise.all(getPlaylistArtists())
      .then((values) => setArtistsFromPlaylist(values))
      .catch((e) => console.log(e));
  }, [current_playlist]);

  return (
    <div className="body">
      {/* s<Header /> */}
      <div className="body_info">
        <img src={current_playlist?.images[0]?.url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>{current_playlist?.name}</h2>
          <p>{current_playlist?.description}</p>
          <div className="body_icons">
          <PlayCircleFilledIcon
            className="body_sh"
            onClick={() => startPlaylist(current_playlist)}
          />
        </div>
        </div>

      </div>

      <ArtistsContainer artists={artistsFromPlaylist} handleArtistSelection={handleArtistSelected} />

      <div className="body_songs">
        {current_playlist?.tracks?.items?.map((item) => {            
          if (trackSelected === item) {
            return (
              <SongRow
                selected
                key={current_playlist?.tracks?.items?.indexOf(item)}
                track={item.track}
              />
            );
          } else {
              if(artist_filter.length==0 || item?.track?.artists[0]?.name?.includes(artist_filter)){
            return (
              <SongRow
                key={current_playlist?.tracks?.items?.indexOf(item)}
                track={item.track}
                selectFunc={() => selectTrack(item)}
              />
            
            )};
          }
        })}
      </div>
    </div>
  );
}
