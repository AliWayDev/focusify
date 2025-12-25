import { soundDatas } from "./assets/data";

const audioContext = new AudioContext();

const masterGain = audioContext.createGain();

masterGain.gain.value = 0;
masterGain.connect(audioContext.destination);

let buffers = [];
let sources = [];
let soundsGain = [];
let isInitialized = false;
let soundChangeDelay = 1;

async function loadAudio() {
  if (buffers.length) return;

  for (let i = 0; i < soundDatas.length; i++) {
    const response = await fetch(soundDatas[i].path);
    const arrayBuffer = await response.arrayBuffer();
    let buffer = await audioContext.decodeAudioData(arrayBuffer);
    buffers.push(buffer);
  }
}

function initSound() {
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
  audioContext.resume();
  masterGain.gain.setTargetAtTime(
    1,
    audioContext.currentTime,
    soundChangeDelay
  );
}

export function pause() {
  masterGain.gain.setTargetAtTime(
    0,
    audioContext.currentTime,
    soundChangeDelay
  );
}

export function onReset() {
  masterGain.gain.setTargetAtTime(
    0,
    audioContext.currentTime,
    soundChangeDelay
  );

  for (let gainEl of soundsGain) {
    gainEl.gain.setTargetAtTime(0, audioContext.currentTime, soundChangeDelay);
  }
}

export function setVolume(value, id) {
  if (!id) return;

  soundsGain[id - 1].gain.setTargetAtTime(
    value,
    audioContext.currentTime,
    soundChangeDelay
  );
}

export async function startAudioEngine() {
  await loadAudio();
  initSound();
}

export async function onResetClick() {
  masterGain.gain.setTargetAtTime(
    0,
    audioContext.currentTime,
    soundChangeDelay
  );
}
