import { useContext } from "react";
import { SoundContext } from "../../context/soundMixerContext";
import ShareIcon from "../../../assets/icons/share.svg";
import DoneIcon from "../../../assets/icons/done.svg";

import "./share.css";

export const Share = () => {
  const { sharePreset, isSoundsLoaded, isShared } = useContext(SoundContext);

  return (
    <div className="share">
      <button
        disabled={isSoundsLoaded}
        onClick={sharePreset}
        style={{
          color: isShared ? "#6CE660" : "#fff",
        }}
      >
        {isShared ? 'Copied' : "Share"}
        <span>
          <img
            height={17}
            width={17}
            src={isShared ? DoneIcon : ShareIcon}
            alt="share icons"
          />
        </span>
      </button>
    </div>
  );
};
