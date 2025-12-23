import React from 'react'

function MainFooter() {
  return (
    <footer className="main-footer">
      <div className="main-footer-content">
        <span>© {new Date().getFullYear()} POTENUP-BOOKS</span>
        <nav>
          <ul className="footer-nav">
            <li><a href="#" aria-label="이용약관">이용약관</a></li>
            <li><a href="#" aria-label="개인정보처리방침">개인정보처리방침</a></li>
            <li><a href="#" aria-label="문의">문의</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default MainFooter