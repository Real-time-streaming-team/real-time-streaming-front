import React, { useEffect, useRef } from 'react'

const StreamViewer = () => {
  const videoRef = useRef(null);  // 비디오 요소를 위한 ref 생성

  useEffect(() => {
    const getMedia = async () => {
      try {
        // 사용자의 웹캠으로부터 미디어 스트림을 얻습니다
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;  // 스트림을 비디오 요소의 srcObject 속성에 할당
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    }

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


  return (
    <div className='flex-1 bg-slate-500 overflow-hidden'>
      <div className='bg-slate-300 h-full overflow-hidden'>
        <video className='w-full' ref={videoRef} autoPlay />
      </div>
    </div>
  )
}

export default StreamViewer
