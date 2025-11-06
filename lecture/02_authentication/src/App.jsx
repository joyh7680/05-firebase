import React from "react";
import { auth } from "./firebase/config";
import UserProfile from "./components/UserProfile";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  //인증된 사용자 정보를 저장하는 state
  const [user, setUser] = useState(null);

  useEffect(() => {
    //인증 상태 변경이 감지될 때마다 현재 그 사용자 정보 user로 반영
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("인증 관련 상태가 변경되었습니다");
      setUser(currentUser);
    });
    //클린업 함수 (구독정보를 해제시킬때)
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* 로그인 후(auth.currentUser에 사용자객체가 있음) - userProfile 컴포넌트가 보여지게 */}
      {/* 로그인 전(auth.currentUser에 null) : LoginForm, SignForm 컴포넌트  */}

      {
        // auth.currentUser ? (
        user ? (
          <UserProfile />
        ) : (
          <div>
            <h2>회원가입</h2>
            <SignupForm />
            <hr />
            <h2>로그인</h2>
            <LoginForm />
          </div>
        )
      }
    </>
  );
}

export default App;
