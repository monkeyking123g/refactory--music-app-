import {
  createContext,
  useReducer,
  useContext,
  useState,
  useMemo,
} from "react";

interface header {
  children: any;
}

const playlistGlobalState = {
  playlist: "0JQ5DAqbMKFLVaM30PMBm4",
  playlistTracks:
    "https://api.spotify.com/v1/playlists/37i9dQZF1DX4Y4RhrZqHhr/tracks",
};
const playerlistGlobalState = {
  audioEl: "",
  isReplay: false,
  isPaused: true,
};
const trackslistGlobalState = {
  tracks: "",
  currentTracks: 0,
  cureentPlayBtn: [],
};

// const currentTracksState = { num: 0, setNum: undefined };
const PlayerlistGlobalState = createContext(playerlistGlobalState);
const PlayerlistDispatchState: any = createContext(undefined);
// const CurrentTracksState = createContext(currentTracksState);
const TrackslistGlobalState = createContext(playerlistGlobalState);
const TrackslistDispatchState: any = createContext(undefined);

const GlobalStateContext = createContext(playlistGlobalState);
const DispatchStateContext: any = createContext(undefined);

const GlobalStateProvider: any = ({ children }: header) => {
  // const [num, setNum] = useState(currentTracksState.num);
  // const numContextValue: any = useMemo(() => ({ num, setNum }), [num]);
  const [state, dispatch] = useReducer(
    (state: any, newValue: any) => ({ ...state, ...newValue }),
    playlistGlobalState
  );
  const [stateTracks, dispatchTracks] = useReducer(
    (state: any, newValue: any) => ({ ...state, ...newValue }),
    trackslistGlobalState
  );
  const [statePlayer, dispatchPlayer] = useReducer(
    (state: any, newValue: any) => ({ ...state, ...newValue }),
    playerlistGlobalState
  );

  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        <PlayerlistGlobalState.Provider value={statePlayer}>
          <PlayerlistDispatchState.Provider value={dispatchPlayer}>
            <TrackslistGlobalState.Provider value={stateTracks}>
              <TrackslistDispatchState.Provider value={dispatchTracks}>
                {/* <CurrentTracksState.Provider value={numContextValue}> */}
                {children}
                {/* </CurrentTracksState.Provider> */}
              </TrackslistDispatchState.Provider>
            </TrackslistGlobalState.Provider>
          </PlayerlistDispatchState.Provider>
        </PlayerlistGlobalState.Provider>
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState: any = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext),
];
// export const useNumState = () => useContext(CurrentTracksState);
export const usePlayerState: any = () => [
  useContext(PlayerlistGlobalState),
  useContext(PlayerlistDispatchState),
];
export const useTracksState: any = () => [
  useContext(TrackslistGlobalState),
  useContext(TrackslistDispatchState),
];

export default GlobalStateProvider;
