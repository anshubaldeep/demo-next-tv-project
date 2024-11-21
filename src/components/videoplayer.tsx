import React, { useEffect, useRef } from "react";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

const VideoPlayerComp = ({
  posterUrl = "",
  manifestUrl,
  licenseServer = "",
}) => {
  const video = useRef(null);
  const videoContainer = useRef(null);
  const playerRef = useRef(null);

  const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
    switch (keyboardEvent.keyCode.toString()) {
      case '13': // Play/Pause
        if (video.current.paused) {
          video.current.play();
        } else {
          video.current.pause();
        }
        break;

      case '38': // Volume Up
        video.current.volume = Math.min(video.current.volume + 0.1, 1);
        break;

      case '40': // Volume Down
        video.current.volume = Math.max(video.current.volume - 0.1, 0);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    const playerLoad = async () => {
      const manifestUri = manifestUrl;
      const videoRef = video.current;
      const videoContainerRef = videoContainer.current;

      if (!videoRef || !videoContainerRef) return;

      try {
        const player = new shaka.Player(videoRef);
        playerRef.current = player;
        const ui = new shaka.ui.Overlay(player, videoContainerRef, videoRef);
        const controls = ui.getControls();

        console.log(Object.keys(shaka.ui));

        player.configure({
          drm: {
            servers: { "com.widevine.alpha": licenseServer },
          },
        });
        await player.load(manifestUri);
        console.log("The video has now been loaded!");
      } catch (error) {
        console.error("Shaka Player load failed:", error);
      }
    };

    playerLoad();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [manifestUrl, licenseServer]);

  return (
    <div
      className="shadow-lg mx-auto max-w-full h-full bg-black"
      ref={videoContainer}
    >
      <video
        id="video"
        ref={video}
        className="w-full h-full"
        poster={posterUrl}
      />
    </div>
  );
};
export default VideoPlayerComp;
