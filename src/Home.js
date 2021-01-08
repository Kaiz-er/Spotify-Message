import React from "react";
import { Row, Col } from "antd";
import { Input, Form } from "antd";
import { Divider } from "antd";
import { Button, notification, Modal } from "antd";
import { Typography } from "antd";
import { useDataLayerValue } from "./DataLayer";
import "./Home.css";
import TrackRow from "./TrackRow";

function Home() {
  const [
    { modalVisible, user, spotify, tracks, enableButton },
    dispatch,
  ] = useDataLayerValue();

  const { TextArea } = Input;
  const { Text, Link } = Typography;
  const keyCounter = 0;
  var textArray = [];
  const [form] = Form.useForm();

  //const [trackArr, addTrack] = React.useState([]);

  const openErrorNotification = (unmatchedArr) => {
    console.log(unmatchedArr);
    var errorString = "Track names ";
    for (var i = 0; i < unmatchedArr.length; i++) {
      errorString = errorString.concat(unmatchedArr[i]);
      if (i != unmatchedArr.length - 1) {
        errorString = errorString.concat(", ");
      }
    }
    errorString = errorString.concat(" cannot be found.");
    notification["error"]({
      message: "Track not found :(",
      description: errorString,
      duration: 6,
      placement: "topLeft",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const openPlaylistCreatedNotification = () => {
    notification["success"]({
      message: "Success! :)",
      description: "Playlist created successfully.",
      duration: 6,
      placement: "topLeft",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  async function getText() {
    textArray = [];
    var tArea = document.getElementById("queryArea");
    var inputTextArray = tArea.value.split(/[ ,.!]+/);
    for (var i = 0; i < inputTextArray.length; i++) {
      var item = inputTextArray[i];
      textArray.push(item.trim()); //item is splitted string text
    }

    dispatch({
      type: "RESET_TRACKS",
      tracks: [],
    });
    var unmatchedArr = [];

    for (var c = 0; c < textArray.length; c++) {
      var t = textArray[c];
      var match = false;
      let prom = await spotify
        .searchTracks('"' + t + '"', { type: "track", limit: 50 })
        .then(
          function (data) {
            for (var c = 0; c < data.tracks.items.length; c++) {
              var track = data.tracks.items[c];
              var trackFirstWord = track.name.substring(t.length, 0);
              if (
                trackFirstWord.toUpperCase() === t.toUpperCase() &&
                (track.name.charAt(t.length) === " " ||
                  track.name.charAt(t.length) === "")
              ) {
                match = true;
                tracks.push(track);
                dispatch({
                  type: "ADD_TRACK",
                  tracks: tracks,
                });
                break;
              }
            }
            if (!match) {
              unmatchedArr.push(t);
            }
            dispatch({
              type: "ENABLE_BUTTON",
              enableButton: true,
            });
          },
          function (err) {
            console.log("ERROR: " + err);
          }
        );
    }
    if (unmatchedArr.length != 0) {
      //unmatched word exists
      openErrorNotification(unmatchedArr);
    }
  }

  function resetGeneration() {
    dispatch({
      type: "RESET_TRACKS",
      tracks: [],
    });
    dispatch({
      type: "DISABLE_BUTTON",
      enableButton: false,
    });
  }

  function openCreatePlaylist() {
    dispatch({
      type: "TOGGLE_MODAL",
      modalVisible: true,
    });
  }

  function closeCreatePlaylist() {
    dispatch({
      type: "TOGGLE_MODAL",
      modalVisible: false,
    });
  }

  function handleOk() {
    var playlistName = document.getElementById("playlistNameText").value;
    var uriArray = [];
    for (var i = 0; i < tracks.length; i++) {
      uriArray.push(tracks[i].uri);
    }
    spotify.createPlaylist(user.id, { name: playlistName }).then(
      function (data) {
        var playlistId = data.id;
        spotify.addTracksToPlaylist(playlistId, uriArray, {}).then(
          function (data) {
            closeCreatePlaylist();
          },
          function (err) {
            console.log(err);
          }
        );
      },
      function (err) {
        console.log(err);
      }
    );
    openPlaylistCreatedNotification();
  }

  return (
    <div>
      <Row type="flex" style={{ alignItems: "center" }}>
        <Col span={12}>
          <Col span={12} offset={6}>
            <Divider>Enter the Message</Divider>
            <TextArea id="queryArea" showCount maxLength={100} />
            <Button
              type="primary"
              onClick={getText}
              style={{
                background: "#1DB954",
                borderRadius: "99px",
                fontWeight: "800",
                borderColor: "#1DB954",
                marginBottom: "10px",
                marginTop: "10px",
              }}
              block
            >
              Generate
            </Button>
            <br></br>
            <Button
              onClick={resetGeneration}
              type="primary"
              style={{
                borderRadius: "99px",
                fontWeight: "800",
                background: "#bd2130",
                borderColor: "#bd2130",
              }}
              block
            >
              Reset
            </Button>
          </Col>
        </Col>
        <Col span={12}>
          <div class="spotifyhalf">
            <Modal
              title="Create Playlist"
              visible={modalVisible}
              onOk={handleOk}
              onCancel={closeCreatePlaylist}
            >
              <Input
                placeholder="Playlist Name"
                allowClear
                required
                id="playlistNameText"
              />
            </Modal>
            {tracks.map((item, index) => (
              <div key={index}>
                <TrackRow track={item} key={keyCounter}></TrackRow>
              </div>
            ))}
            <Col span={12} offset={6} align="middle">
              <Button
                onClick={openCreatePlaylist}
                disabled={!enableButton}
                type="primary"
                style={{
                  background: "#1DB954",
                  borderRadius: "99px",
                  fontWeight: "800",
                  borderColor: "#1DB954",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginBottom: "20px",
                  marginTop: "20px",
                }}
                block
              >
                Create Playlist
              </Button>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
