export const authEndpoint = 
"https://accounts.spotify.com/authorize";

const redirectUri = "https://message-with-spotify.web.app/";
const clientId = "b7d55c01b86543dcae9ba15312b82eab"

const scopes = [
    "playlist-modify-public",
    "playlist-read-private",
    "user-read-private",
];

export const getToken = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;