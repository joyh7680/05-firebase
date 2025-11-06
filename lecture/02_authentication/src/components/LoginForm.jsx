import React from "react";
import { useState } from "react";
import { login } from "../service/authService";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  //loading이 처리중이니? 아니 끝났어 => false

  //폼의 기본 제출 동작(페이지 새로고침)을 막음.
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); //로그인 시도 시작 (버튼 비활성화)
    try {
      await login(formData.email, formData.password); // 서버에 로그인 요청 중
    } catch (error) {
      let errorMsg = "로그인 중 오류가 발생했습니다.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg = "올바른 이메일 형식이 아닙니다.";
          break;
        case "auth/invalid-credential":
          errorMsg = "등록된 계정이 아닙니다";
          break;
        case "auth/too-many-requests":
          errorMsg =
            "너무 많은 로그인 시도가 있었습니다. 잠시후 다시 시도해주세요";
          break;
      }
      // alert(에러메시지);
      alert(errorMsg); // 로그인 요청이 끝났으니 다시 false로 돌림
    } finally {
      //finally성공이든 실패든 마지막에 공통적으로 실행할 코드를 넣는 구조
      setLoading(false); //로딩 상태를 해제하는 코드
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="이메일"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "처리중" : "로그인"}
      </button>
    </form>
  );
}

export default LoginForm;
