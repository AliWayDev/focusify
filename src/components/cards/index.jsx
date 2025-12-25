import { useContext } from "react";
import { CardsItem } from "./cards-item/cards-item";
import { SoundContext } from "../context/soundMixerContext";

import "./index.css";

export const Cards = () => {
  const { soundsData, onVolumeChange } = useContext(SoundContext);
  return (
    <div className="cards">
      {soundsData.map((i) => (
        <CardsItem
          id={i.id}
          title={i.title}
          key={i.id}
          volume={i.volume}
          isActive={i.volume > 0}
          onVolumeChange={onVolumeChange}
        />
      ))}
    </div>
  );
};
