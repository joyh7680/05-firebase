import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

function MainHeader() {

  // 중앙저장소로부터 사용자 상태 읽기 
  const { userProfile } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    const result = await dispatch(logout());
    if(result.meta.requestStatus === 'fulfilled') { // 로그아웃 성공시
      navigate('/');
    }
  }

  return (
    <header className="main-header">
      <div className="main-header-content">
        <NavLink to="/" className="main-logo">POTENUP-BOOKS</NavLink>
        <nav>
          <ul className="main-nav">
            <li><NavLink to="/" end>홈</NavLink></li>
            <li><NavLink to="/books" end>도서</NavLink></li>
            {/* 로그인 전 */}
            {!userProfile && (
              <>
                <li><NavLink to="/auth/login" end>로그인</NavLink></li>
                <li><NavLink to="/auth/signup" end>회원가입</NavLink></li>
              </>
            )}
            {/* 로그인 후 */}
            {userProfile && userProfile.role === 'USER' && (
              <li><NavLink to="/mypage" end>{userProfile.name}님</NavLink></li>
            )}
            {/* 관리자 권한의 사용자일 경우 */}
            {userProfile && userProfile.role === 'ADMIN' && (
              <li><NavLink to="/admin" end>관리자 페이지</NavLink></li> 
            )}
            {userProfile && <li><span onClick={handleLogout}>로그아웃</span></li>}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MainHeader