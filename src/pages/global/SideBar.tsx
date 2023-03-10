import { useState } from "react";
import { Link } from "react-router-dom";
// Pro sidebar
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

// animte Css
import { motion } from "framer-motion";

// Mui Component
import { Box, Typography } from "@mui/material";
// icons
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

//My Component
import { MenuToggle } from "../../components/ButtonUI/Toggle";

const Item = ({ title, to, icon, selected, setSelected }: any) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        setSelected(title);
      }}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const { collapseSidebar } = useProSidebar();
  const { collapsed } = useProSidebar();
  const [title, setTitle] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar
        defaultCollapsed
        backgroundColor="rgba(0, 136, 169, 1)"
        transitionDuration={1200}
        rootStyles={{
          border: "none",
          boxShadow: `3px 0 0 0 #212121`,
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  fontSize: "20px",
                  color: disabled ? "#edf0f1" : "#edf0f1",
                  backgroundColor: active ? "rgba(36, 37, 42, 1)" : undefined,
                  "&:hover": {
                    backgroundColor: "rgba(36, 37, 42, 1)",
                  },
                };
            },
          }}
        >
          <MenuItem
            icon={
              <motion.div
                initial={false}
                animate={collapsed ? "closed" : "open"}
              >
                <MenuToggle
                  toggle={() => {
                    collapseSidebar();
                  }}
                ></MenuToggle>
              </motion.div>
            }
          />
          <Item
            title={"Albums"}
            to={"/album"}
            selected={title}
            icon={<LibraryMusicIcon />}
            setSelected={setTitle}
          />
          <Item
            title={"Tracks"}
            to={"/track"}
            selected={title}
            icon={<AudiotrackIcon />}
            setSelected={setTitle}
          />
          <Item
            title={"Playlist"}
            to={"/playlist"}
            selected={title}
            icon={<PlaylistPlayIcon />}
            setSelected={setTitle}
          />
          <Item
            title={"Genres"}
            to={"/"}
            selected={title}
            icon={<QueueMusicIcon />}
            setSelected={setTitle}
          />
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
