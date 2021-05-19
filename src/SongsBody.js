import React from 'react'
import SongRow from './SongRow'
import "./Body.css";
import { useDataLayerValue } from './DataLayer';


export default function SongsBody({data, selectTrack, children}) {
    const [{trackSelected, artist_filter}, dispatch] = useDataLayerValue()
    console.log(data)
    return (
        <div>
            { data?.tracks && children}
        <div className="body_songs">
            
        {data?.tracks?.items?.map((item) => {  
            if (trackSelected === item) {
                //track will be set to a different property depending on how the data comes from spotify
                
                return (
                    <SongRow
                    selected
                    key={data?.tracks?.items?.indexOf(item)}
                    track={item.track? item.track : item}
                    />
                    );
                } else {
                    if(artist_filter.length==0 || item?.track?.artists[0]?.name?.includes(artist_filter)){
                        return (
                            <SongRow
                            key={data?.tracks?.items?.indexOf(item)}
                            track={item.track? item.track : item}
                            selectFunc={() => selectTrack(item)}
                            />
                            
                            )};
                        }
                    })}
      </div>
                    </div>
    )
}
