import { useEffect, useRef, useState } from 'react';

const StreamViewer = () => {
  const videoRef = useRef(null); // 비디오 요소를 위한 ref 생성
  const [mute, setMute] = useState(false);

  useEffect(() => {
    const getMedia = async () => {
      try {
        // 사용자의 웹캠으로부터 미디어 스트림을 얻습니다
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // 스트림을 비디오 요소의 srcObject 속성에 할당
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMedia();
    console.log(videoRef.current, videoRef.current.srcObject);

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // 컴포넌트 언마운트 시 스트림 정리
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const pauseHandler = () => {
    const videoTracks = videoRef.current.srcObject.getVideoTracks();
    console.log(videoTracks);
  };

  const muteHandler = () => {
    const audioTracks = videoRef.current.srcObject.getAudioTracks();
    audioTracks.forEach(item => {
      if (mute) item.enabled = false;
      else item.enabled = true;
    });
    setMute(prev => !prev);
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* video */}
      <div className="h-full bg-black">
        <video className="w-full h-full m-auto" ref={videoRef} autoPlay />
      </div>

      {/* controller */}
      <div className="absolute bottom-0 left-0 w-full transition-all duration-500 opacity-0 bg-mute hover:opacity-100 ">
        <div className="flex justify-between">
          <div className="flex">
            <button onClick={pauseHandler}>멈춤</button>
            <button onClick={muteHandler}>{mute ? 'unmute' : 'mute'}</button>
          </div>
          <div className="flex">
            <button>시간</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamViewer;
