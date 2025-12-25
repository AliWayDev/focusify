import { useContext } from "react";
import { SoundContext } from "../../context/soundMixerContext";
import ResetIcon from "../../../assets/icons/reset.svg";

import "./reset.css";

export const Reset = () => {
  const { onResetHandler } = useContext(SoundContext);

  return (
    <div className="reset">
      <button onClick={onResetHandler}>
        Reset
        <span>
          <img src={ResetIcon} alt="reset icons" />
        </span>
      </button>
    </div>
  );
};
