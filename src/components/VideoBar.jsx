import Video from "./Video";

const VideoBar = ({ peersStream, userId }) => {
  return (
    <div className="bg-neutral-800 overflow-auto whitespace-nowrap  p-1">
      {peersStream.map((peer) => {
        return peer.userId === undefined ? (
          <div></div>
        ) : (
          <Video
            key={peer.userId}
            media={peer.stream}
            height={110}
            width={160}
            muted={userId === peer.userId ? true : false}
          ></Video>
        );
      })}
    </div>
  );
};
export default VideoBar;
