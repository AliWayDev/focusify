import { useEffect, useState } from "react";
import { onReset, pause, play, setVolume } from "../audioEngine";
import { soundDatas } from "../assets/data";

export const useSoundMixer = () => {
  const [isSoundsLoaded, setIsSoundsLoaded] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundsData, setSoundsData] = useState(soundDatas);

  useEffect(() => {
    setTimeout(() => {
      setIsSoundsLoaded(false);
    }, 2000);
  }, []);

  const onPlayPauseHandler = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }

    play();
    setIsPlaying(true);
  };

  const onResetHandler = () => {
    let updatedList = soundsData.map((i) => {
      return { ...i, volume: "0" };
    });

    setSoundsData(updatedList);
    setIsPlaying(false);

    onReset();
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
  };

  return {
    isPlaying,
    soundsData,
    onPlayPauseHandler,
    onResetHandler,
    onVolumeChange,
    isSoundsLoaded,
  };
};
