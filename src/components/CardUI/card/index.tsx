import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTheme } from "@mui/material/styles";
import { usePlayerState } from "../../GlobalState";

interface Card {
  img: string;
  name: string;
  preview_url: string;
  refreshTrack: any;
  playPause?: boolean;
}
const MultiActionAreaCard = ({
  img,
  name,
  preview_url,
  refreshTrack,
  playPause,
}: Card) => {
  const theme = useTheme();
  const [state, dispatch] = usePlayerState();

  const handleClick = (value: string | null) => {
    if (value === null) {
      console.log("No prewiew !.");
    } else {
      if (state.audioEl.src !== value) {
        dispatch((state.isPaused = false));
        state.audioEl.src = value;
      }
      dispatch((state.isPaused = !state.isPaused));
      refreshTrack(value);
    }
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: "12px",
        color: "#edf0f1",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
          <CardMedia component="img" image={img} alt={name} />
          <Typography
            component="div"
            variant="h5"
            sx={{
              overflow: "hidden",
              width: "300px",
              whiteSpace: "nowrap",
              // color: "#edf0f1",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="span"
            sx={{
              p: 0.5,

              border: "1px solid",
              color: preview_url ? "#07f" : "red",
              borderRadius: "30px",
            }}
          >
            {preview_url ? "Preview" : "No Preview"}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
            justifyContent: "space-around",
          }}
        >
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon sx={{ color: "#07f" }} />
            ) : (
              <SkipPreviousIcon sx={{ color: "#07f" }} />
            )}
          </IconButton>
          <IconButton
            aria-label="play/pause"
            onClick={() => {
              handleClick(preview_url);
            }}
          >
            {playPause ? (
              <PauseIcon sx={{ height: 38, width: 38, color: "#07f" }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38, color: "#07f" }} />
            )}
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon sx={{ color: "#07f" }} />
            ) : (
              <SkipNextIcon sx={{ color: "#07f" }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default MultiActionAreaCard;
