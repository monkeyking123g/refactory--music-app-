import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";

import { ProSidebarProvider } from "react-pro-sidebar";

// Global Component
import SideBar from "./pages/global/SideBar";
import Topbar from "./pages/global/Topbar";

//Components
import Album from "./pages/album";
import Track from "./pages/track";
import Playlist from "./pages/playlist";
import Genre from "./pages/genre";
import Footer from "./components/Footer";
import GlobalStateProvider from "./components/GlobalState";
import ListTrack from "./pages/listTrack";

// THEME
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
function App() {
  return (
    <GlobalStateProvider>
      <ProSidebarProvider>
        <div className="App">
          <SideBar />
          <div className="wrapper">
            <ThemeProvider theme={theme}>
              <Topbar />
              <Routes>
                <Route path="/" element={<Genre />} />
                <Route path="/album" element={<Album />} />
                <Route path="/track" element={<Track />} />
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/listTrack" element={<ListTrack />} />
              </Routes>
              <Footer />
            </ThemeProvider>
          </div>
        </div>
      </ProSidebarProvider>
    </GlobalStateProvider>
  );
}

export default App;
