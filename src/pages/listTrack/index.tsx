import { useState, useEffect } from "react";
import "../../index.css";
import {
  Box,
  List,
  ListItem,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
// API SPOTIFY
import { getToken, getTracks } from "../../api/SpotifyApi";

// ICONS
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

// Global State
import {
  useGlobalState,
  useTracksState,
  usePlayerState,
} from "../../components/GlobalState";

import Header from "../../components/Header";
// COLORS
import { colors } from "../../theme";
import { red } from "@mui/material/colors";

export const ListTrack = () => {
  const [load, setLoad] = useState(false);

  const [tracksList, setTracksList] = useState<any>([]);
  const [state, dispatch] = useGlobalState();
  const [statePlayer, dispatchPlayer] = usePlayerState();
  const [stateTracks, dispatchTracks] = useTracksState();

  useEffect(() => {
    console.log("render Tradd");
  }, [stateTracks, dispatchTracks]);

  useEffect(() => {
    setLoad(true);
    try {
      const loadPlaylist = async () => {
        //Get token
        const token = await getToken();
        const tracks = await getTracks(token, state.playlistTracks);
        const listTrack: any = [];
        const list: string | any = [];
        await Promise.all(
          tracks.map(async (el: any) => {
            const data = {
              id: el.track.id,
              image: el.track.album.images[1].url,
              name: el.track.name,
              prev: el.track.preview_url,
              playPause: false,
            };

            if (el.track.preview_url !== null) {
              await list.push(el.track.preview_url);
            }
            await listTrack.push(data);
          })
        );

        dispatchTracks((stateTracks.tracks = list));

        dispatchTracks((stateTracks.cureentPlayBtn = listTrack));

        setTracksList(list);
      };
      loadPlaylist();
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  }, [state, dispatch]);

  /// Function
  const refreshTrack = (prev: any) => {
    const newList: any = stateTracks.cureentPlayBtn.map((value: any) => {
      if (value.prev === prev) {
        const index = tracksList.indexOf(value.prev);
        dispatchTracks((stateTracks.currentTracks = index));
        return { ...value, playPause: !value.playPause };
      } else {
        return { ...value, playPause: false };
      }
    });
    dispatchTracks((stateTracks.cureentPlayBtn = newList));
  };
  const handleClick = (value: string) => {
    if (value === null) {
      console.log("No prewiew !.");
    } else {
      if (statePlayer.audioEl.src !== value) {
        dispatchPlayer((statePlayer.isPaused = false));
        statePlayer.audioEl.src = value;
      }
      dispatchPlayer((statePlayer.isPaused = !statePlayer.isPaused));
      refreshTrack(value);
    }
  };

  return (
    <Box borderRadius={"4px"} height="81.5vh">
      <Box display="flex" justifyContent="space-between">
        <Header title="playlist"></Header>
        <Typography
          component="span"
          sx={{ textAlign: "center", fontSize: "2.75rem" }}
        >
          {stateTracks.cureentPlayBtn.length}
        </Typography>
      </Box>
      {load ? (
        <Box display={"flex"} marginBottom="auto"></Box>
      ) : (
        <Box overflow="auto" height="90.8%">
          <List className="playlist-item">
            {stateTracks.cureentPlayBtn.map((trak: any) => {
              return (
                <ListItem key={trak.id}>
                  <Avatar alt={trak.name} src={trak.image} />
                  <IconButton onClick={() => handleClick(trak.prev)}>
                    {trak.playPause ? (
                      <PauseIcon sx={{ color: colors.secondaryBlue }} />
                    ) : (
                      <PlayArrowIcon sx={{ color: colors.secondaryBlue }} />
                    )}
                  </IconButton>
                  <Typography component="span">{trak.name}</Typography>
                  <Typography component="span">00:00</Typography>
                  <Typography
                    component="span"
                    sx={{ color: trak.prev ? colors.secondaryBlue : "red" }}
                  >
                    {trak.prev ? "Preview" : "No Preview"}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default ListTrack;
