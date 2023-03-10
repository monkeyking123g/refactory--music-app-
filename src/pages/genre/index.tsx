import { useEffect, useState } from "react";
import Header from "../../components/Header";
// API Spotify
import { getToken, getGenres } from "../../api/SpotifyApi";
// MUI Component
import { Box, Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
///
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../components/GlobalState";

export const Genre = () => {
  const [spacing, setSpacing] = useState(2);
  const [load, setLoad] = useState(true);
  const [genres, setGenres] = useState([]);
  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();

  ////////////// Function /////////////////

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };
  const handleClick = (playlist: string) => {
    dispatch((state.playlist = playlist));
    console.log(playlist);
    navigate("/playlist");
  };
  /////////////// useffect //////////////
  useEffect(() => {
    try {
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
    <Box m="10px">
      <Header title="Genre Page" />
      <Box
        display="grid "
        // mt="auto"
        // ml="2.5rem"
        gridTemplateColumns="repeat(auto-fit, 250px)"
        gap="2.5rem"
        height="71vh"
        width="auto"
        overflow="auto"
        // justifySelf="center"
        justifyContent="center"
      >
        {genres.map((genre: any) => (
          <Box key={genre.id} onClick={() => handleClick(genre.id)}>
            {load ? (
              <Skeleton
                variant="rectangular"
                width={250}
                height={250}
                sx={{ borderRadius: "10px" }}
              />
            ) : (
              <Paper
                // key={genre.id}
                sx={{
                  height: 250,
                  width: 250,
                  backgroundImage: `url(${genre.icons[0].url})`,
                  objectFit: "contain",
                  borderRadius: "10px",
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
                {genre.name}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
    // </Box>
  );
};

export default Genre;
