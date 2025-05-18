import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";

const MusicPlayer = () => {
  const [audio] = useState(new Audio("./bgmusic.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.5;

    const autoPlayOnFirstClick = () => {
      if (!isUserInteracted) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => {
          console.warn("Autoplay blocked:", e);
        });
        setIsUserInteracted(true);
      }
    };

    window.addEventListener("click", autoPlayOnFirstClick, { once: true });

    return () => {
      window.removeEventListener("click", autoPlayOnFirstClick);
    };
  }, [audio, isUserInteracted]);

  const handleMusicToggle = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="fixed top-5 right-5 text-white text-3xl cursor-pointer z-50"
      onClick={handleMusicToggle}
      title={isPlaying ? "Pause Music" : "Play Music"}
    >
      <i className={isPlaying ? "ri-pause-line" : "ri-music-2-fill"}></i>
    </div>
  );
};

export default MusicPlayer;
