import { useEffect, useState } from "react";
import { onReset, pause, play, setVolume } from "../audioEngine";
import { soundDatas } from "../assets/data";

export const useSoundMixer = () => {
  const [isSoundsLoaded, setIsSoundsLoaded] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundsData, setSoundsData] = useState(soundDatas);

  useEffect(() => {
    const preset = JSON.parse(window.localStorage.getItem('focusify:preset:v1'))

    if(preset?.length > 0) {
      let updatedList = preset.map((i) => {
        return { ...i, volume: i.volume };
      });
  
      setSoundsData(updatedList)
    }
  }, [])

  const onPlayPauseHandler = () => {
    const preset = JSON.parse(window.localStorage.getItem('focusify:preset:v1'))

    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }

    play(preset);
    setIsPlaying(true);

    presetSaver(soundsData);
  };

  const onResetHandler = () => {
    let updatedList = soundsData.map((i) => {
      return { ...i, volume: "0" };
    });

    setSoundsData(updatedList);
    setIsPlaying(false);

    onReset();

    presetSaver(updatedList);
  };

  const onVolumeChange = (value, id) => {
    setVolume(value, id);

    let updatedList = soundsData.map((i) => {
      if (i.id === id) {
        return { ...i, volume: value };
      }
      return i;
    });

    setSoundsData(updatedList);

    presetSaver(updatedList);
  };

  const presetSaver = (data = []) => {
    window.localStorage.setItem('focusify:preset:v1', JSON.stringify(data))
  };

  return {
    isPlaying,
    soundsData,
    onPlayPauseHandler,
    onResetHandler,
    onVolumeChange,
    isSoundsLoaded,
    setIsSoundsLoaded,
  };
};
