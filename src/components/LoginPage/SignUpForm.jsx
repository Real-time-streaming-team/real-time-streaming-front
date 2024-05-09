import { useCallback,useState } from "react"
import { Button, Input } from "../form/LoginComponent"
import { Post } from "../../api/api"
const SignUpForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [nickName, setNickName] = useState('')
    
    const [emailAlertMessage, setEmailAlertMessage] = useState('')
    const [pwdAlertMessage, setPwdAlertMessage] = useState('')
    const [pwdConfirmAlertMessage, setPwdConfirmAlertMessage] = useState('') 
    
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
    
  
    const handleSignUp = useCallback(
      async (e) => {
          e.preventDefault()
          try{
            const response = await Post('http://158.247.240.142:80/user/signup', {
              email : email,
              password : password,
              nickname : nickName,
            });
            console.log('response :', response)
            alert('회원가입에 성공하였습니다.')
        
          }
          catch(err){
            console.log(err)
            alert('회원가입에 실패했습니다.')
          }
        },
        [email, password, nickName]
      )
    
    const onChangeEmail = useCallback((e) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const currentEmail = e.target.value;
      setEmail(currentEmail)
      
      if(!emailRegex.test(currentEmail)){
        setEmailAlertMessage('이메일 형식을 다시 확인해주세요')
        setIsEmail(false)
        
      }else{
        setIsEmail(true)
        setEmailAlertMessage('올바른 형식 입니다.')
      }
    },[])
  
    const onChangePwd = useCallback((e) => {
      const pwdRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])[A-Za-z\d!@#$%^&*()-+=]{10,}$/
      const currentPwd = e.target.value;
      setPassword(currentPwd);
  
      if(!pwdRegex.test(currentPwd)){
        setPwdAlertMessage('대문자 첫글자+영문+숫자+특수문자 조합으로 10자리 이상 입력해주세요')
        setIsPassword(false)
      }
      else{
        setPwdAlertMessage('올바른 형식 입니다.')
        setIsPassword(true)
      }
    },[])
  
    const onChangePwdConfirm = useCallback((e) => {
      const currentPwdConfirm = e.target.value;
      setPasswordConfirm(currentPwdConfirm)
  
      if(password === currentPwdConfirm){
        setPwdConfirmAlertMessage('동일한 비밀번호 입니다.')
        setIsPasswordConfirm(true)
      }
      else{
        setPwdConfirmAlertMessage('비밀번호가 동일하지 않습니다.')
        setIsPasswordConfirm(false)
      }
    }, [password])
  
  
    return (
      <>
        <form onSubmit={handleSignUp} className="flex flex-col w-full mt-9">
          <div className="flex flex-col gap-4 mb-9">
            <Input name="email" onChange={onChangeEmail} placeholder="E-mail Address" type="email" ></Input>
            {email.length > 0 && <span className={`${isEmail ? 'text-primary-color' : 'text-red-400'} text-xs text-left`}>{emailAlertMessage}</span>}
            <Input name="password" placeholder="Password" type="password" onChange={onChangePwd}></Input>
            {password.length > 0 && <span className={`${isPassword ? 'text-primary-color' : 'text-red-400'} text-xs text-left`}>{pwdAlertMessage}</span>}
            <Input name="password2" placeholder="Confirm Password" type="password" onChange={onChangePwdConfirm} ></Input>
            {passwordConfirm.length > 0 && <span className={`${isPasswordConfirm ? 'text-primary-color' : 'text-red-400'} text-left text-xs`}>{pwdConfirmAlertMessage}</span>}
            <Input name="nickname" placeholder="Nickname" onChange={(e) => setNickName(e.target.value)}></Input>
          </div>
          <Button item='largeButton' type='submit' disabled={!(isEmail && nickName && isPassword && isPasswordConfirm)} onClick={handleSignUp}>SIGN UP</Button>
        </form>
      </>
    );
}
export default SignUpForm;