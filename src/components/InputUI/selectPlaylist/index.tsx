import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGlobalState } from "../../GlobalState";
// Spotify Api
import { getToken, getPlaylistByGenre } from "../../../api/SpotifyApi";

const PlaylistSelect = () => {
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [state, dispatch] = useGlobalState();
  const [load, setLoad] = useState(false);
  const handleChangePLay = (event: SelectChangeEvent) => {
    setPlaylistName(event.target.value as string);
    dispatch((state.playlistTracks = event.target.value));
  };
  /***********  usEffect **************/
  useEffect(() => {
    try {
      setLoad(true);
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
    <Box sx={{ minWidth: 120 }}>
      {load ? (
        "Loading..."
      ) : (
        <FormControl fullWidth>
          <InputLabel>Playlist</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="select"
            value={playlistName}
            label="Playlist"
            onChange={handleChangePLay}
          >
            {playlist.map((play: any) => {
              return (
                <MenuItem key={play.id} value={play.tracks.href}>
                  {play.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default PlaylistSelect;
