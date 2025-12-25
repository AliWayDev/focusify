import { Cards } from "./components/cards";
import { PlayPause } from "./components/control/PlayPause/PlayPause";
import { Reset } from "./components/control/Reset/Reset";
import { Header } from "./components/layout/header/Header";

import { startAudioEngine } from "./audioEngine";

import "./App.css";
import { useSoundMixer } from "./hooks/useSoundMixer";
import { SoundContext } from "./components/context/soundMixerContext";
import { Loader } from "./components/loader/Loader";

startAudioEngine();

function App() {
  const soundMixer = useSoundMixer();

  return (
    <div className="App">
      <SoundContext value={soundMixer}>
        {soundMixer.isSoundsLoaded ? (
          <Loader />
        ) : (
          <div>
            <Header />
            <div className="controlls">
              <PlayPause />
              <Reset />
            </div>
            <div>
              <Cards />
            </div>
          </div>
        )}
      </SoundContext>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
