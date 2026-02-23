import { soundDatas } from "./assets/data";

const audioContext = new AudioContext();

const masterGain = audioContext.createGain();

masterGain.gain.value = 0;
masterGain.connect(audioContext.destination);

let buffers = [];
let sources = [];
let soundsGain = [];
let isInitialized = false;
let soundChangeDelay = 0.3;

async function loadAudio(onLoaded) {
  let count = 0;
  if (buffers.length) return;

  for (let i = 0; i < soundDatas.length; i++) {
    const response = await fetch(soundDatas[i].path);
    const arrayBuffer = await response.arrayBuffer();
    let buffer = await audioContext.decodeAudioData(arrayBuffer);

    if (buffer) {
      count++;
    }

    buffers.push(buffer);
  }
  if (count === soundDatas.length) {
    onLoaded(false);
  }
}

export function initSound() {
  if (isInitialized) return;
  if (sources.length > soundDatas.length) return;

  for (let i = 0; i < soundDatas.length; i++) {
    let source = audioContext.createBufferSource();
    source.buffer = buffers[i];
    source.loop = true;

    sources.push(source);

    let soundGain = audioContext.createGain();
    soundGain.gain.value = 0;

    soundsGain.push(soundGain);

    sources[i].connect(soundsGain[i]);
    soundsGain[i].connect(masterGain);

    sources[i].start();
  }

  isInitialized = true;
}

export function play() {
  if (!isInitialized) {
    initSound();
  }

  audioContext.resume();
  masterGain.gain.setTargetAtTime(
    1,
    audioContext.currentTime,
    soundChangeDelay,
  );
}

export function pause() {
  masterGain.gain.setTargetAtTime(
    0,
    audioContext.currentTime,
    soundChangeDelay,
  );
}

export function onReset() {
  if (!isInitialized) {
    initSound();
  }

  masterGain.gain.setTargetAtTime(
    0,
    audioContext.currentTime,
    soundChangeDelay,
  );

  for (let gainEl of soundsGain) {
    gainEl.gain.setTargetAtTime(0, audioContext.currentTime, soundChangeDelay);
  }
}

export function setVolume(value, id) {
  if (!isInitialized) {
    initSound();
  }

  if (!id) return;

  soundsGain[id - 1].gain.setTargetAtTime(
    value,
    audioContext.currentTime,
    soundChangeDelay,
  );
}

export async function startAudioEngine(cb) {
  await loadAudio(cb);
}

export async function onResetClick() {
  masterGain.gain.setTargetAtTime(
    0,
    audioContext.currentTime,
    soundChangeDelay,
  );
}
