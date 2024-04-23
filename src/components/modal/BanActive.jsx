function BanActive({ setBanActive }) {
  return (
    <div className="absolute left-0 top-0 min-h-[80px] w-full rounded-sm border-[.1px] border-[#494949] bg-[#0E0B19]">
      <div className="relative">
        <button
          type="button"
          onClick={() => setBanActive(false)}
          className="absolute right-3 top-0 text-lg text-gray-600"
        >
          x
        </button>
        <div className="flex items-center justify-between p-5">
          <div className="flex">
            <div className="mr-3 size-[50px] rounded-full bg-blue-700" />
            <div className="flex flex-col justify-center">
              <div className="text-lg font-bold ">username</div>
              <div className="text-xs ">dkdk</div>
            </div>
          </div>
          <div>🔴</div>
        </div>
      </div>
    </div>
  );
}

export default BanActive;
