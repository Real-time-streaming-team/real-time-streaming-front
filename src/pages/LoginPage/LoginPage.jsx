import { useEffect,useState } from "react";
import { Button, Input } from "../../components/form/LoginComponent";
import './LoginPage.css'
import { Post } from "../../api/api";
import { useNavigate } from "react-router-dom";
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
      // 브라우저 창의 크기가 바뀌면 변수의 값도 바뀌니까
      // 이벤트리스너를 추가해서 계속 감시함
      window.addEventListener('resize', setRootHeight)
  
      // 지도 컴포넌트 언마운트 될 때 제거
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

const SignInForm = () => {
  


  return (
    <>
      <div className="flex flex-col gap-5 mt-9">
        <div className="flex items-center justify-center">
          <div className="w-full p-px text-sm text-white h-11 hover:opacity-90 bg-gradient-to-r from-primary-color to-secondary-color">
            <button className="flex items-center w-full h-full px-5 bg-black">
              <img className="mr-24" src="/images/kakao.png"></img>
              <span>Sign in with <span className="font-bold">Kakao</span></span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full p-px text-sm text-white h-11 hover:opacity-90 bg-gradient-to-r from-primary-color to-secondary-color">
            <button className="flex items-center w-full h-full px-5 bg-black ">
              <img className="mr-24" src="/public/images/naver.png"></img>
              <span>Sign in with <span className="font-bold">Naver</span></span>
            </button>
          </div>
        </div>
      </div>  
      <form className="flex flex-col w-full gap-5 mt-5">
        <div className="w-full p-px h-11 bg-gradient-to-r from-primary-color to-secondary-color ">
          <input placeholder ="E-mail Address" className="w-full h-full p-3 bg-black placeholder:text-white focus:outline-none focus:border-primary-color"/>
        </div>
        <div className="w-full p-px h-11 bg-gradient-to-r from-primary-color to-secondary-color ">
          <input type="password" placeholder="Password" className="w-full h-full p-3 bg-black placeholder:text-white focus:outline-none focus:border-primary-color "/>
        </div>
        <button className="px-5 py-3 text-base font-semibold rounded bg-gradient-to-br from-primary-color to-secondary-color h-14 focus:outline-none hover:opacity-90">
          SIGN IN
        </button>
      </form>
      <div className="flex justify-between ">
        <button className="mt-3 text-xs text-primary-color focus:outline-none hover:opacity-90">
          FORGOT E-MAIL?
        </button>
        <button className="mt-3 text-xs text-primary-color focus:outline-none hover:opacity-90">
          FORGOT PASSWORD?
        </button>
      </div>
    </>
  )
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email : '',
    password : '',
    nickname : '',
  })
  
  const handleSignUpInputChange = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }
  const handleSignUp = async () => {
    try{
      await Post('http://158.247.240.142:80/user/signup', user);
      console.log(user)
      alert('회원가입에 성공하였습니다.')
      //navigate('/')
    }
    catch(err){
      console.log(err)
      alert('회원가입에 실패했습니다.')
    }
  }

  


  return (
    <>
      <form className="flex flex-col w-full mt-9">
        <div className="flex flex-col gap-6">
          <Input name="email" onChange={handleSignUpInputChange} placeholder="E-mail Address" type="email" ></Input>
          <Input name="password" placeholder="Password" type="password" onChange={handleSignUpInputChange}></Input>
          <Input name="password2" placeholder="Confirm Password" type="password"></Input>
          <Input name="nickname" placeholder="Nickname" onChange={handleSignUpInputChange}></Input>
        </div>
        <Button onClick={handleSignUp}>SIGN UP</Button>
      </form>
    </>
  );
}
export default LoginPage;
