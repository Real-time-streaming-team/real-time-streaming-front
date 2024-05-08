import { useCallback, useEffect,useState } from "react";
import './LoginPage.css'
import SignUpForm from "../../components/LoginPage/SignUpForm";
import SignInForm from "../../components/LoginPage/SignInForm";
const LoginPage = () => {
  return (
      <LoginForm></LoginForm>
  )
};

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true)

  function handleLogin(){
    setIsLogin(!isLogin)
  }
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
        <div className="flex flex-col w-full max-w-sm text-center bg-background max-h-96 ">
            {isLogin ?
              <div className="flex flex-row items-center justify-center font-semibold gap-7">
                <button onClick={handleLogin} className="text-5xl text-transparent bg-gradient-to-b from-primary-color to-secondary-color bg-clip-text">SIGN IN</button>
                <button onClick={handleLogin} className="text-5xl text-gray-600">SIGN UP</button>
              </div> :
              <div className="flex flex-row items-center justify-center font-semibold gap-7">
                <button onClick={handleLogin} className="text-5xl text-gray-600">SIGN IN</button>
                <button onClick={handleLogin} className="text-5xl text-transparent bg-gradient-to-b from-primary-color to-secondary-color bg-clip-text"  >SIGN UP</button>
              </div>
            }
            {isLogin ? <SignInForm></SignInForm> : <SignUpForm></SignUpForm>}
        </div>
      </div>
  )
}




export default LoginPage;
