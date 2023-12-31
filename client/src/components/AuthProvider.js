// user state 관리

import { useEffect, useState } from "react";
import AuthContext from './AuthContext'

// chidren -> Routes
export default function AuthProvider({ children }) {
  // 로컬스토리지에서 user의 초기값을 가져온다
  const initialUser = JSON.parse(localStorage.getItem("user"))
  const [ user, setUser ]   = useState(initialUser)

  // user 감시자

  // useEffect -> 로컬스토리지 동기화
  useEffect(() => {
    if (user) { // 로그인, 정보 수정 시
      localStorage.setItem("user", JSON.stringify(user))
    } else { // 로그아웃 시
      localStorage.removeItem("user")
    }
  }, [user])

  // 하위 컴포넌트에 전달 
  const value = { user, setUser }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
};