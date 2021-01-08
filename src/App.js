import React, { useEffect, useState } from "react";
import './App.css';
import Login from "./Login";
import Home from "./Home";
import {getToken} from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebApi(); //super object for interaction betw app and spotify

function App() {

  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getToken();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token); //gives the spotify api the access token given
      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

    }

}, []);


  return (
    <div className="app">
      {
        token ? (
          <Home></Home>
        ) : (
          <Login></Login>
        )
      }
    </div>
  );
}

export default App;
