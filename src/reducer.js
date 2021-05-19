export const initialState ={
    user:null,
    playlists:[],
    playing:false,
    item:null,
    discover_weekly: null,
    current_playlist: null,
    tracks : null, // list of the tracks inside the current play list to display on main screen along with a property to check if 
                    //it is selected
    trackSelected : null,
    player_id: null,
    spotify_player:null,
    artist_filter:"",
    isPlaying:false,
    volume:1,
    token:null//"BQBVSb1nFNbCcpcsstzWqDj44xfNZNbhqfm5OKDqXTrQ1p8PT4…PGDRzsnC0Gh0oho_YC8Fc9voYwXN6tVnmPLJ22jDQ2f6ppQdV"
};

export const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
            
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
                current_playlist : action.playlists?.items[0]                
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly, 
                current_playlist: action.discover_weekly,
                tracks: action.discover_weekly.tracks.items
            }
        case 'SET_CURRENT_PLAYLIST':
            return{
                ...state,
                current_playlist: action.playlist,
                tracks : action.playlist.tracks.items?.map(item => 
                   ({
                        track:item.track,
                        selected : false
                    })),
                artist_filter:""
            }
        case 'SELECT_TRACK':
            return{
                ...state,
                trackSelected : action.track,
                isPlaying :  action.isPlaying
            }
        case 'SET_PLAYER_ID':
            return{
                ...state,
                player_id : action.player_id
            }
        case 'SET_PLAYER':
            return{
                ...state,
                spotify_player : action.player
            }
        case 'SET_ARTIST_FILTER':
            return{
                ...state,
                artist_filter : action.artist_filter
            }    
        case 'TOGGLE_PLAYBACK':
            return{
                ...state,
                isPlaying:action.isPlaying
            }  
        case 'SET_VOLUME':
            return{
                ...state,
                volume:action.volume
            }        
        default:
            return state;
    }

};