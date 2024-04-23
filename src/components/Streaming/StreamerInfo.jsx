function StreamerInfo({ streamer }) {
  return (
    <div className="flex">
      <div className="mr-5 size-[80px] rounded-full bg-blue-700" />
      <div className="flex flex-col justify-center">
        <div className="text-xl ">{streamer.name}</div>
        <div>{streamer.title}</div>
      </div>
    </div>
  );
}

export default StreamerInfo;
