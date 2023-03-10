import { useState, useEffect } from "react";
import Audio from "../Audio";

const SynthPad = () => {
  //set state to represent initial value of masterGainNode
  const [masterGainValue, setMasterGainValue] = useState(0);

  const initializeMasterGain = () => {
    // Connect the masterGainNode to the audio context to allow it to output sound.
    Audio.masterGainNode.connect(Audio.context.destination);

    // Set masterGain Value to 0
    Audio.masterGainNode.gain.setValueAtTime(0, Audio.context.currentTime);
  };

  //initialize masterGainNode on first render
  useEffect(initializeMasterGain, []);
  const changeMasterVolume = (e: any) => {
    Audio.masterGainNode.gain.setValueAtTime(
      parseInt(String(e.target.value / 100)),
      Audio.context.currentTime
    );
    setMasterGainValue(e.target.value / 100);
  };

  return (
    <div>
      // ... code from the previous snippet
      {/*though the gain is set between 0 and 1, 
            we use a range of 0 - 100 in order for the 
            slider to work smoothly*/}
      <input
        type="range"
        min="0"
        max="100"
        value={masterGainValue * 100}
        onChange={changeMasterVolume}
        className="pad-volume"
      />
      <button className="play">Play</button>
    </div>
  );
};

export default SynthPad;
