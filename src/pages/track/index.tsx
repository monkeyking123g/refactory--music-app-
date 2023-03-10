import { useState, useEffect, memo } from "react";
import Header from "../../components/Header";
// MUI
import { Box, Skeleton } from "@mui/material";
// API SPOTIFY
import { getToken, getTracks } from "../../api/SpotifyApi";
// MY
import BasicSelect from "../../components/InputUI/selectGenre";
import MultiActionAreaCard from "../../components/CardUI/card";
import PlaylistSelect from "../../components/InputUI/selectPlaylist";
// Global State
import { useGlobalState, useTracksState } from "../../components/GlobalState";

export const Track = () => {
  const [load, setLoad] = useState(false);
  const [tracksList, setTracksList] = useState<any>([]);
  const [state, dispatch] = useGlobalState();
  const [stateTracks, dispatchTracks] = useTracksState();

  /**************** useEffect **********************/
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

  /**************** FUNCTION **********************/
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
  const handelLoad = () => {
    setLoad(!load);
  };

  return (
    <Box m="10px">
      <Box display="flex" justifyContent="end" alignItems="center">
        <Header title="Track Page" />
        <BasicSelect />
        <PlaylistSelect />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, 300px)"
        gap="2.5rem"
        height="71vh"
        overflow="auto"
        justifyContent="center"
      >
        {load ? (
          <h1 style={{ color: "black" }}>Loading...</h1>
        ) : (
          stateTracks.cureentPlayBtn.map((trak: any) => {
            return (
              <Box key={trak.id}>
                {load ? (
                  <Skeleton
                    variant="rectangular"
                    width={300}
                    height={400}
                    sx={{ borderRadius: "10px" }}
                  />
                ) : (
                  <MultiActionAreaCard
                    playPause={trak.playPause}
                    refreshTrack={refreshTrack}
                    img={trak.image}
                    name={trak.name}
                    preview_url={trak.prev}
                  />
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default Track;
