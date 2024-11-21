import dynamic from "next/dynamic";
import React from "react";
import "shaka-player/dist/controls.css";
const VideoPlayerComp = dynamic(() => import("@/components/videoplayer"), {
  ssr: false,
});

export const getServerSideProps = async () => {
  return {
    props: {
      noLayout: true,
    },
  };
};

const Player = () => {
  return (
    <div className="relative w-full h-full lg:h-[98vh]">
      <VideoPlayerComp manifestUrl="https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd" />
    </div>
  );
};

export default Player;
