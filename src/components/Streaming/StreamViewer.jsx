// eslint-disable-next-line import/no-extraneous-dependencies
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';

const StreamViewer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (Hls.isSupported()) {
      const video = videoRef.current;
      hlsRef.current = new Hls();
      hlsRef.current.loadSource(`/hls/1.m3u8`);
      hlsRef.current.attachMedia(video);
    }
    return () => {
      // 컴포넌트 언마운트 시 hls.js 인스턴스 해제
      hlsRef.current.destroy();
    };
  }, [hlsRef]);
  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted; // 현재 상태의 반대값으로 설정
    setIsMuted(!isMuted); // 상태 업데이트
  };
  // 재생 및 일시정지 토글 함수
  const togglePlay = () => {
    const video = videoRef.current;
    console.log(video.duration);
    if (isPlaying) {
      video.pause();
      video.currentTime = video.duration - 3; // 가장 최신으로 이동
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying); // 상태 업데이트
  };
  return (
    <div className="relative flex-1 overflow-hidden">
      {/* video */}
      <div className="h-full bg-black">
        <video className="m-auto size-full" ref={videoRef} autoPlay controls>
          <track
            src="/hls/1.m3u8"
            kind="captions"
            srcLang="ko"
            label="korea_captions"
          />
        </video>
      </div>

      {/* controller */}
      <div className="absolute bottom-0 left-0 w-full opacity-0 transition-all duration-500 hover:opacity-100 ">
        <div className="flex justify-between">
          <div className="flex">
            <button type="button" onClick={toggleMute}>
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button type="button" onClick={togglePlay}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamViewer;
