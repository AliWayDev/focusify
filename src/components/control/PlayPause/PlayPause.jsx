import { useContext } from "react";
import { SoundContext } from "../../context/soundMixerContext";
import PlayIcon from "../../../assets/icons/play.svg";
import PauseSvg from "../../../assets/icons/pause.svg";

import "./playpause.css";

export const PlayPause = () => {
  const { isPlaying, onPlayPauseHandler, isSoundsLoaded } = useContext(SoundContext);

  return (
    <div className="playpause">
      <button
        disabled={isSoundsLoaded}
        onClick={onPlayPauseHandler}
        style={{
          border: isPlaying ? "2px solid #51bfe0ff" : "1px solid #fff",
        }}
      >
        {!isPlaying ? "Play" : "Pause"}
        <span>
          {!isPlaying ? (
            <img src={PlayIcon} alt="play" />
          ) : (
            <img src={PauseSvg} alt="pause" />
          )}
        </span>
      </button>
    </div>
  );
};
