export const initialState = {
  //empty data layer
  user: null,
  playlists: [],
  playing: false,
  tracks: [],
  enableButton: false,
  spotify: null,
  modalVisible: false,
  //TODO: Remove after development
  token: "",
  //"BQDIFzqS-N6gsi77tHMI5eRFIN_Efhs5iPvBMIMJqbxH5blI8EPi7cb0lIJ-N2N-hqW9gn194YmNxQOjkM6LFQUY8Lz815kUt46bFe5XgOPIQfCSLZ15REsSSkuDBcHYw4jJB4JUOkU0s9KJXI0AGHpKu5OIYicY8JuBfxDTZa6dHbRLss9uwUAzjC663DVhAtpLt3I9PUQzrkfGaiQHfo7s9HreqZQ",
};

//state = what the current state looks like
//action = actual operation at current
//reducer listens to actions
const reducer = (state, action) => {
  console.log(action);
  //Action = type, dynamic payload
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

    case "ADD_TRACK":
      return {
        ...state,
        tracks: action.tracks,
      };

      case "ENABLE_BUTTON":
        return {
          ...state,
          enableButton: true,
        };

        case "DISABLE_BUTTON":
        return {
          ...state,
          enableButton: false,
        };

        case "RESET_TRACKS":
        return {
          ...state,
          tracks: action.tracks,
        };

        case "TOGGLE_MODAL":
        return {
          ...state,
          modalVisible: action.modalVisible,
        };
  

    default:
      return state;
  }
};

export default reducer;
