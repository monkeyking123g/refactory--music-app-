class Audio {
  static context = new window.AudioContext();

  static masterGainNode = Audio.context.createGain();
}

export default Audio;
