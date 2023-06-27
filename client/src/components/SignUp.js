import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../utils/request'

export default function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  // 입력값
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // 폼 제출 처리
  async function handleSubmit(e) {
    try{
      e.preventDefault(e)

      // 입력값의 집합
      const newUser = { email, fullName, username, password }

      // 입력값 유효성 검사
      const _error = {}

      // 이메일 입력값에 @이 없을 때
      if (email.indexOf("@") === -1) {
        _error.email = "유효한 이메일이 아닙니다."
      } 

      // 정규식
      if (username.match(/[^a-z0-9_]/)) {
        _error.username = "아이디는 영어 소문자와 숫자, _만 입력 가능합니다"
      }

      // 유효성 검사 실패
      if (Object.keys(_error).length > 0) {
        throw _error;
      }

      // 서버에 유저 생성 요청
      await createUser(newUser);
      
      // 가입완료 메세지
      alert(`안녕하세요 ${fullName} 님`)
      
      // 로그인 페이지로 이동
      navigate("/")

    } catch(error) {
      setError(error)
    }
  }

  useEffect(() => {
    document.title = "회원가입 - Instagram"
  }, [])

  return (
    <form onSubmit={handleSubmit} className='max-w-xs mx-auto p-4 mt-16'>
      <div className='my-4 flex justify-center'>
        <img src="/images/logo.png" alt="" className='w-36'/>
      </div>

      {/*이메일*/}
      <div className='mb-2'>
        <label className='block'>
          <input 
            type="text"
            name='email'
            className='border px-2 py-1 rounded w-full outline-none'
            onChange={({target})=> setEmail(target.value)}
            placeholder='이메일' />
        </label>
        {error && <p className='text-red-500 text-xs mt-1 px-1'>{error.email}</p>}
      </div>

      {/*이름*/}
      <div className='mb-2'>
         <label className="block">
          <input 
            type="text"
            name='fullname'
            className='border px-2 py-1 rounded w-full outline-none'
            onChange={({target}) => setFullName(target.value)}
            placeholder='이름' />
        </label>
      </div>

      {/*아이디*/}
      <div className='mb-2'>
        <label className="block">
          <input 
            type="text"
            name='username'
            className='border px-2 py-1 rounded w-full outline-none'
            onChange={({target}) => setUserName(target.value)}
            placeholder="아이디" />
        </label>
        {error && <p className='text-red-500 text-xs mt-1 px-1'>{error.username}</p>}
      </div>

      {/*비밀번호*/}
      <div className='mb-2'>
        <label className="block">
          <input 
            type="password"
            name='password'
            className='border rounded px-2 py-1 w-full outline-none'
            onChange={({target}) => setPassword(target.value)}
            placeholder="비밀번호"
            autoComplete="new-password" />
        </label>
      </div>

      <div className="mb-2">
        <button
          type='submit'
          className='bg-[#0066ff] rounded-lg text-sm font-semibold px-4 py-2
          text-white w-full disabled:opacity-[0.5]'
          disabled={email.trim().length < 5 || username.trim().length < 5 || password.trim().length <5}>
            가입하기
        </button>
        {error && <p className='text-red-500 text-center my-4'>{error.messege}</p>}
      </div>

      <p className="text-center mt-4">
        계정이 있으신가요? {" "}
        <Link to="/accounts/login" className='text-blue-500 font-semibold'>
          로그인
        </Link>
      </p>
    </form>
  )
};