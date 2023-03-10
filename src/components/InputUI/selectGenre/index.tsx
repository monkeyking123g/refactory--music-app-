import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGlobalState } from "../../GlobalState";
// Spotify Api
import { getToken, getGenres } from "../../../api/SpotifyApi";

const BasicSelect = () => {
  const [genreName, setGenreName] = useState("");
  const [genres, setGenres] = useState([]);
  const [state, dispatch] = useGlobalState();
  const [load, setLoad] = useState(false);

  /************  function  ***************/
  const handleChange = (event: SelectChangeEvent) => {
    setGenreName(event.target.value as string);
    dispatch((state.playlist = event.target.value));
  };

  /***********  usEffect **************/
  useEffect(() => {
    try {
      setLoad(true);
      const loadGenres = async () => {
        //Get token
        const token = await getToken();
        const genres = await getGenres(token);
        console.log(genres);
        setGenres(genres);
      };
      loadGenres();
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false);
    }
  }, []);

  return (
    <Box sx={{ minWidth: 120, ml: "auto" }}>
      {load ? (
        "LOADING..."
      ) : (
        <FormControl fullWidth sx={{}}>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={genreName}
            label="Genre"
            onChange={handleChange}
          >
            {genres.map((genre: any) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default BasicSelect;
