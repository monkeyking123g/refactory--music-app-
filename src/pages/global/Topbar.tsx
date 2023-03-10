import { useEffect, useState, useCallback } from "react";

// MUI Component
import { Box, Avatar, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

// My Component
import FormDialog from "../../components/DIalogUI/FormDialog";

const Topbar: React.FC<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyPress = useCallback((event: any) => {
    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      handleClickOpen();
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <Box p={2} display="flex" justifyContent="space-between">
      <FormDialog open={open} handleClose={handleClose}></FormDialog>
      <Box
        display="flex"
        borderRadius="4px"
        alignItems="center"
        onClick={handleClickOpen}
        sx={{ border: "1px solid #555" }}
      >
        <IconButton
          type="button"
          sx={{
            //p: 1,
            borderRadius: "0",
          }}
        >
          <Search />
        </IconButton>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search" />
        <kbd>Ctrl</kbd>&nbsp;&nbsp;<kbd style={{ marginRight: "10px" }}>K</kbd>
      </Box>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Box>
  );
};
export default Topbar;
