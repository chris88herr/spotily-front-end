// Authentication spotify redirect
export const authEndpoint = "https://accounts.spotify.com/authorize";

//redirect to our app home page once authorized
const redirectUri = 'https://spotily-app-front-end.herokuapp.com/';

//spotify api client id
console.log(process.env)
const clientId = process.env.REACT_APP_SPOTIFY_API_KEY;

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
    "user-read-private",
    "app-remote-control",
];

export const getTokenFromSpotify = () => {

    return window.location.hash.
    substring(1).split('&').reduce((initial, item) => {
        let parts = item.split('=');
        // console.log(parts)
        // console.log(initial)
        // console.log(parts[1] + " " + decodeURIComponent(parts[1]))
        initial[parts[0]] =  decodeURIComponent(parts[1]);
        return initial;
    }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;


