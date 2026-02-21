import { useContext } from "react";
import "./header.css";
import { SoundContext } from "../../context/soundMixerContext";

export const Header = () => {
  const { isPlaying } = useContext(SoundContext);

  return (
    <div className="title">
      <p>FOCUS • efficiency</p> {isPlaying && <div className="pulse"></div>}
    </div>
  );
};
