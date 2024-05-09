import { Button, Input } from "../../components/form/LoginComponent";
import { useEffect } from "react";
import './MyPage.css'
const MyPage = () => {

  const setRootHeight = () => {
    const root = document.documentElement
    root.style.setProperty('--window-height', `${window.innerHeight - 50}px`)
  }
  
  useEffect(() => {
      setRootHeight()
      window.addEventListener('resize', setRootHeight)
  
      return () => {
        window.removeEventListener('resize', setRootHeight)
      }
    }, [])

  return (
    <div className="background-wrapper flex items-center justify-center  bg-background bg-[url('/images/background.png')]">
      <main className="flex flex-col mx-auto my-12 h-4/5  w-[1440px] min-w-[768px]">
        <span className="h-12 mb-5 text-4xl font-normal">
          <p>my page</p>
        </span>
        <section className="flex flex-col h-full gap-7 p-16 bg-white/[0.03] shadow-lg">
          <div className="flex items-center w-full gap-10 border-b-[1.5px] border-gray-600 h-36">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-color to-secondary-color"></div>
            <div className="flex flex-col justify-center h-24">
              <p className="text-xl font-normal">streamer ID</p>
              <div className="flex gap-2">
                <img className="w-3 h-3 aspect-auto" src="images/icon-follower.png"></img>
                <p className="text-xs">12345</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full gap-2 border-b-[1.5px] border-gray-600 h-36">
            <div className="flex gap-2 ">
              <img className="w-5 h-5" src="/public/icon-community-active.png"></img>
              <p className="text-base font-semibold">Nickname setting</p>
            </div>
            <div className="flex gap-2 h-14">
              <div className="w-80">
                <Input/>
              </div>
              <Button item='smallButton'>DONE</Button>
            </div>
          </div>
          <div className="relative flex justify-between w-full p-5 border-b-[1.5px] border-gray-600 h-44 ">
            <div className="flex flex-col justify-center gap-3">
              <p className="font-sans text-4xl font-normal text-primary-color">TOTAL PROCEEDS</p>
              <p className="text-6xl font-bold font-custom ">0,000,000,000</p>
            </div>
            <div className="absolute bottom-6 right-6">
              <Button item='largeButton'>CHARGE</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
};




export default MyPage;
