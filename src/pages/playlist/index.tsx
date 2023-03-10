import { useState, useEffect } from "react";
import Header from "../../components/Header";

// Mui
import { Box, Skeleton, Paper } from "@mui/material";
// Api
import { getToken, getPlaylistByGenre } from "../../api/SpotifyApi";
// Global state
import { useGlobalState } from "../../components/GlobalState";
// My component
import BasicSelect from "../../components/InputUI/selectGenre";
import { useNavigate } from "react-router-dom";
export const Playlist = () => {
  const [load, setLoad] = useState(true);
  const [playlist, setPlaylist] = useState([]);
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();

  /**************** function **********************/
  const handleClick = (tracks: any) => {
    console.log(tracks);
    dispatch((state.playlistTracks = tracks));
    navigate("/listTrack");
  };

  /**************** useEffect **********************/
  useEffect(() => {
    try {
      const loadPlaylist = async () => {
        //Get token
        const token = await getToken();
        const playlist = await getPlaylistByGenre(token, state.playlist);
        console.log(playlist);
        setPlaylist(playlist);
      };
      loadPlaylist();
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  }, [state, dispatch]);

  return (
    <Box m="10px">
      <Box display="flex">
        <Header title="Genre Page" />
        <BasicSelect />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, 300px)"
        gap="2.5rem"
        height="71vh"
        overflow="auto"
        justifySelf="center"
        justifyContent="center"
      >
        {playlist.map((playlist: any) => (
          <Box
            key={playlist.id}
            onClick={() => handleClick(playlist.tracks.href)}
          >
            {load ? (
              <Skeleton
                variant="rectangular"
                width={300}
                height={400}
                sx={{ borderRadius: "10px" }}
              />
            ) : (
              <Paper
                // key={playlist.id}
                sx={{
                  height: 400,
                  width: 300,
                  backgroundImage: `url(${playlist.images[0].url})`,
                  objectFit: "scale-down",
                  borderRadius: "10px",
                  backgroundSize: "cover",
                  // backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              />
            )}
            {load ? (
              <Skeleton sx={{ fontSize: "20px" }} />
            ) : (
              <Box component="span" sx={{ fontSize: "20px" }}>
                {playlist.name}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Playlist;
