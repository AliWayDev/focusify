import { useEffect, useState } from "react";
import { onReset, pause, play, setVolume } from "../audioEngine";
import { soundDatas } from "../assets/data";
import {
  checkValidQueryParams,
  createPresetUrl,
  getDataFromUrlParams,
} from "../utils";

export const useSoundMixer = () => {
  const [isSoundsLoaded, setIsSoundsLoaded] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundsData, setSoundsData] = useState(soundDatas);
  const [isShared, setIsShared] = useState(false);

  const presentHandler = () => {
    const preset = JSON.parse(
      window.localStorage.getItem("focusify:preset:v1"),
    );

    const urlParams = new URLSearchParams(window.location.search);
    let params = getDataFromUrlParams(urlParams);

    if (urlParams.size > 0 && checkValidQueryParams(window.location.search)) {
      window.localStorage.setItem("focusify:preset:v1", JSON.stringify(preset));
      setSoundsData(params);
      return;
    }

    if (preset?.length > 0) {
      let updatedList = preset.map((i) => {
        return { ...i, volume: i.volume };
      });
      setSoundsData(updatedList);
    }
  };

  useEffect(() => {
    presentHandler();
  }, []);

  const clearParams = () => {
    window.history.replaceState(null, "", "/");
  };

  const onPlayPauseHandler = () => {
    clearParams();

    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }

    play(soundsData);
    setIsPlaying(true);

    presetSaver(soundsData);
  };

  const onResetHandler = () => {
    clearParams();

    let updatedList = soundsData.map((i) => {
      return { ...i, volume: "0" };
    });

    setSoundsData(updatedList);
    setIsPlaying(false);

    onReset();

    presetSaver(updatedList);
  };

  const onVolumeChange = (value, id) => {
    clearParams();

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
    window.localStorage.setItem("focusify:preset:v1", JSON.stringify(data));
  };

  const sharePreset = async () => {
    let acc = 0;
    for (let i of soundsData) {
      if (parseFloat(i.volume) === 0) {
        acc += 1;
      }
    }

    console.log(acc, soundsData.length);

    if (acc === soundsData.length) {
      return;
    }

    const url = window.location.href + "?";

    const type = "text/plain";

    const clipboardItemData = {
      [type]: url + createPresetUrl(soundsData),
    };

    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);

    setIsShared(true);

    setTimeout(() => {
      setIsShared(false);
    }, 2000);
  };

  return {
    isPlaying,
    soundsData,
    onPlayPauseHandler,
    onResetHandler,
    onVolumeChange,
    isSoundsLoaded,
    setIsSoundsLoaded,
    sharePreset,
    isShared,
  };
};
