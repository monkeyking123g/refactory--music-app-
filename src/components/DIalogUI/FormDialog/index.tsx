import * as React from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogContent,
  InputAdornment,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { PlayArrow, Download } from "@mui/icons-material";
import { getToken, getSearch } from "../../../api/SpotifyApi";
// COLORS
import { colors } from "../../../theme";
interface formDialog {
  open?: any;
  handleClose?: any;
}
export default function FormDialog({ open, handleClose }: formDialog) {
  const [search, setSearch] = React.useState("");
  const [tracks, setTracks] = React.useState([]);

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };
  React.useEffect(() => {
    const loadData = async () => {
      const token = await getToken();
      const result = await getSearch(token, search, "track");
      // console.log(result);
      setTracks(result.tracks.items);
    };
    loadData();
  }, [search, setSearch]);
  return (
    <div>
      <Dialog
        fullWidth
        sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <Box display="flex">
            <TextField
              autoFocus
              value={search}
              onChange={handleChange}
              margin="dense"
              label="Search"
              type="search"
              fullWidth
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <Search />
              //     </InputAdornment>
              //   ),
              // }}
            />
          </Box>
          <Box overflow="auto">
            <List
              sx={{
                "&  li": {
                  display: "flex",
                  justifyContent: "space-between",
                },
              }}
            >
              {tracks.map((track: any) => {
                return (
                  <ListItem key={track.id}>
                    <PlayArrow sx={{ color: colors.secondary }} />
                    <Typography>{track.name}</Typography>
                    <Download sx={{ color: colors.secondary }} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </DialogContent>
        {/* <DialogActions>
       
          
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
