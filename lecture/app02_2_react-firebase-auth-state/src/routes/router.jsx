import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AdminLayout from '../layouts/AdminLayout'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/auth/LoginPage'
import SignupPage from '../pages/auth/SignupPage'
import MyPage from '../pages/mypage/MyPage'
import MyOrderListPage from '../pages/mypage/MyOrderListPage'
import BookListPage from '../pages/book/BookListPage'
import BookDetailPage from '../pages/book/BookDetailPage'
import Dashboard from '../pages/admin/Dashboard'
import BookManage from '../pages/admin/BookManage'
import MyPageLayout from '../layouts/MyPageLayout'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {index: true, element: <MainPage />},
      {path: 'auth/login', element: <LoginPage />},
      {path: 'auth/signup', element: <SignupPage />},
      {
        path: 'mypage',
        element: <MyPageLayout />,
        children: [
          {index: true, element: <MyPage />},
          {path: 'orders', element: <MyOrderListPage />}
        ]
      },
      {path: 'books', element: <BookListPage />},
      {path: 'books/:id', element: <BookDetailPage />}
    ]
  },
  // 로그인한 사용자의 권한이 'admin'인 경우 접근 가능
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {index: true, element: <Dashboard />},
      {path: 'books', element: <BookManage />}
    ]
  }
])

export default router