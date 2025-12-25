import MuteIcon from "../../../assets/icons/mute.svg";

export const CardsItem = ({ id, title, volume, isActive, onVolumeChange }) => {
  return (
    <div
      className="cards_item"
      style={{
        "--intensity": volume,
        border: isActive && "1px solid #293a5fff",
      }}
    >
      {!isActive && (
        <span>
          <img src={MuteIcon} alt="mute" />
        </span>
      )}
      <p style={{ color: isActive && "#0395e9ff" }}>{title}</p>
      <input
        type="range"
        min="0.0"
        max="1.0"
        step="0.01"
        value={volume}
        list="volumes"
        name="volume"
        className="slider"
        onChange={(e) => onVolumeChange(e.target.value, id)}
      />
      <datalist id="volumes">
        <option value="0.0" label="Mute"></option>
        <option value="1.0" label="100%"></option>
      </datalist>
    </div>
  );
};
