import { useCookies } from "react-cookie";
import { useState, useCallback } from "react";
import { Post } from "../../api/api";
import { useNavigate } from "react-router-dom";
const SignInForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cookie, setCookie] = useCookies(['id']);
    const onChangeEmail = (e) => {
      setEmail(e.target.value)
    }
  
    const onChangePwd = (e) => {
      setPassword(e.target.value)
    }
  
    const navigate = useNavigate();
    const handleSignIn = useCallback(
      async (e) => {
        e.preventDefault()
        try{
          const response = await Post('http://158.247.240.142:80/user/login', {
            email : email,
            password : password,
          });
          console.log('response :', response)
          setCookie('id', response.token)
          alert('로그인에 성공하였습니다.')
          navigate('/')
        }
        catch(err){
          console.log(err)
          alert('로그인에 실패했습니다. 아이디 혹은 비밀번호를 다시 확인해주세요')
        }
      },
      [email, password]
    )
    
    return (
      <>
        <div className="flex flex-col gap-5 mt-9">
          <div className="flex items-center justify-center">
            <div className="w-full p-px text-sm text-white h-11 hover:opacity-90 bg-gradient-to-r from-primary-color to-secondary-color">
              <button className="flex items-center w-full h-full px-5 bg-black">
                <img className="mr-24" src="/images/kakao.png"></img>
                <span>Sign in with <strong>Kakao</strong></span>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full p-px text-sm text-white h-11 hover:opacity-90 bg-gradient-to-r from-primary-color to-secondary-color">
              <button className="flex items-center w-full h-full px-5 bg-black ">
                <img className="mr-24" src="/public/images/naver.png"></img>
                <span>Sign in with <strong>Naver</strong></span>
              </button>
            </div>
          </div>
        </div>  
        <form className="flex flex-col w-full gap-5 mt-5" onSubmit={handleSignIn}>
          <div className="w-full p-px h-11 bg-gradient-to-r from-primary-color to-secondary-color ">
            <input placeholder ="E-mail Address" className="w-full h-full p-3 bg-black placeholder:text-white focus:outline-none focus:border-primary-color" onChange={onChangeEmail}/>
          </div>
          <div className="w-full p-px h-11 bg-gradient-to-r from-primary-color to-secondary-color ">
            <input type="password" placeholder="Password" className="w-full h-full p-3 bg-black placeholder:text-white focus:outline-none focus:border-primary-color " onChange={onChangePwd}/>
          </div>
          <button className="px-5 py-3 text-base font-semibold rounded bg-gradient-to-br from-primary-color to-secondary-color h-14 focus:outline-none hover:opacity-90" onClick={handleSignIn}>
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

export default SignInForm;