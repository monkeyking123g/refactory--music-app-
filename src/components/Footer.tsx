import { useState, useRef, useEffect, memo } from "react";
import "../App.css";
import test from "./test.mp3";
import test2 from "./test2.mp3";
// MUI ICONS
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DownloadIcon from "@mui/icons-material/Download";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import Audio from "../Audio";
import { useSharedState } from "../store";

// GLOBAL STATE
import { usePlayerState, useTracksState } from "./GlobalState";

const Footer = () => {
  ///////////////////// Variable //////////////////////////
  const audioRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const seekbarRef = useRef<any>(null);
  const volumeRef = useRef<any>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [analyserr, setAnalyserr] = useState<any>();
  const [dataaArray, setDataArray] = useState<any>();
  const [ctx, seCtx] = useState<any>();
  const [bufferLength, setBufferLength] = useState<any>();
  const [iconState, setIconState] = useState(<PlayCircleIcon />);
  const [state, dispatch] = usePlayerState();
  const [stateTracks, dispatchTracks] = useTracksState();

  const [states, setState] = useSharedState();

  const [masterGainValue, setMasterGainValue] = useState(70);
  const [currentTime, setCurrentTime] = useState({
    strCurrentTime: "00:00",
    namCurrentTime: 0,
  });
  const [duration, setDuration] = useState({
    strDuration: "00:00",
    namDuration: 0,
  });

  const [indexPlaylist, setIndexPlaylist] = useState<any>(0);
  let source: any;
  let analyser;
  let audioelement: any;

  ///////////////////// useEffect ////////////////////////////////
  useEffect(() => {
    if (window !== undefined) {
      audioelement = audioRef.current;
      // audioelement.src = playlist[0][0];
      setSize({
        ...size,
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
      });
      dispatch((state.audioEl = audioelement));
      const canvasCtx = canvasRef.current.getContext("2d");
      seCtx(canvasCtx);
      // audioRef.current.addEventListener("ended", onEnd);
      audioRef.current.crossOrigin = "anonymous";

      if (!source) {
        source = Audio.context.createMediaElementSource(audioelement);
        analyser = Audio.context.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyser.connect(Audio.context.destination);
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        setBufferLength(bufferLength);
        setAnalyserr(analyser);
        setDataArray(dataArray);
      }
    }
  }, []);

  // useEffect(() => {
  //   setIndexPlaylist(stateTracks.currentTime);
  // }, [stateTracks, dispatchTracks]);

  ///////////////////// Function ////////////////////////////////
  function draw() {
    analyserr.getByteFrequencyData(dataaArray);
    ctx.fillStyle = "rgb(2, 2, 2)";
    ctx.fillRect(0, 0, size.width, size.height);

    const barWidth = (size.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataaArray[i] / 2.8;
      //canvasCtx.fillStyle = `rgba(0, 136, 169, 1)`;
      ctx.fillStyle = `rgb(0, 136, 169)`;
      ctx.fillRect(x, size.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
    requestAnimationFrame(draw);
  }
  useEffect(() => {
    // const togglePlayPause = () => {
    // draw();
    // if (state.traks.length > 0) {
    //   audioRef.current.src = state.traks[0][indexPlist];
    // }
    Audio.context.resume().then(() => {
      if (state.isPaused) {
        // draw();

        setIconState(<PauseCircleIcon />);
        audioRef.current.play();
      } else {
        // if (state.isReplay) {
        //   dispatch((state.isReplay = false));
        //   audioRef.current.pause();
        //   return;
        // }
        setIconState(<PlayCircleIcon />);
        audioRef.current.pause();
      }
      // setAudioState({ ...audioState, isPaused: !audioState.isPaused });
    });
  }, [state, dispatch]);

  function Duration(e: any) {
    const minutes = Math.floor(audioRef.current.duration / 60);
    const seconds = Math.floor(audioRef.current.duration - minutes * 60);
    const currentTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    setDuration({
      ...duration,
      strDuration: currentTime,
      namDuration: e.target.duration,
    });
  }

  const onEnd = () => {
    console.log(stateTracks.currentTracks);
    if (stateTracks.currentTracks + 1 < stateTracks.tracks.length) {
      console.log("NOT REPLEY");
      // dispatch((state.isPaused = true));
      dispatchTracks(
        (stateTracks.currentTracks = stateTracks.currentTracks + 1)
      );
      const newList: any = stateTracks.cureentPlayBtn.map((value: any) => {
        const currentTrack = stateTracks.tracks[stateTracks.currentTracks];
        if (value.prev === currentTrack) {
          // const index = stateTracks.tracks.indexOf(value.prev);
          return { ...value, playPause: true };
        } else {
          return { ...value, playPause: false };
        }
      });
      dispatchTracks((stateTracks.cureentPlayBtn = newList));
      audioRef.current.src = stateTracks.tracks[stateTracks.currentTracks];
      audioRef.current.play();
    } else {
      // setIconState(<ReplayCircleFilledIcon />);
      // dispatch((state.isReplay = true));
      // dispatch((state.isPaused = !state.isPaused));
      dispatchTracks((stateTracks.currentTracks = 0));
      audioRef.current.src = stateTracks.tracks[stateTracks.currentTracks];
    }
  };
  function onSeek(evt: any) {
    audioRef.current.currentTime = evt.target.value;
  }
  const str_pad_left = (string: any, pad: any, length: any) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };
  const timeUpdate = (event: any) => {
    const minutes = Math.floor(event.target.currentTime / 60);
    const seconds = Math.floor(event.target.currentTime - minutes * 60);
    const currentTimes =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    setCurrentTime({
      ...currentTime,
      strCurrentTime: currentTimes,
      namCurrentTime: event.target.currentTime,
    });
  };
  const changeMasterVolume = (e: any) => {
    audioRef.current.volume = e.target.value / 100;
    setMasterGainValue(e.target.value / 100);
  };

  return (
    <footer>
      <div className="main-footer">
        <audio
          onLoadedMetadata={Duration}
          ref={audioRef}
          controls
          id="audio"
          onEnded={onEnd}
          onTimeUpdate={timeUpdate}
        ></audio>
        <div className="audio-player">
          <canvas ref={canvasRef} height="50" width="480"></canvas>
          <div className="controls">
            <button
              className="play-pause"
              onClick={() => {
                dispatch((state.isPaused = !state.isPaused));
              }}
            >
              {iconState}
            </button>
            <p style={{ color: "#fff", margin: "0 5px 0 5px" }}>
              {currentTime.strCurrentTime}
            </p>
            <input
              type="range"
              max={duration.namDuration}
              ref={seekbarRef}
              value={currentTime.namCurrentTime}
              onChange={onSeek}
              className="seekbar"
            ></input>
            <p style={{ color: "#fff", margin: "0 5px 0 5px" }}>
              {duration.strDuration}
            </p>
            <VolumeUpIcon className="white" />
            <input
              type="range"
              min="0"
              max="100"
              value={masterGainValue * 100}
              onChange={changeMasterVolume}
              ref={volumeRef}
              className="volume"
            ></input>
            {/* <FolderList playlist={playlist}></FolderList> */}
            <DownloadIcon className="white" />
          </div>
        </div>
        <div className="name-album-text">
          <ul>
            <li id="scroll-text">
              Hello,
              <br />
              let's get started.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
