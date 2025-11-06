import React from 'react'
import ContentHeader from '../../components/admin/ContentHeader'
import DashboardCard from '../../components/admin/DashboardCard'
import StatCard from '../../components/admin/StatCard'
import './Dashboard.css'

function Dashboard() {

  // 임시 데이터
  const dashboardCards = [
    {title: '총 사용자', icon: '👥', value: 1234, description: '이번 달 신규 가입자'},
    {title: '총 매출', icon: '💰', value: 12345678, description: '이번 달 총 매출액', currency: '₩'},
    {title: '주문 수', icon: '📦', value: 567, description: '이번 달 총 주문 수'},
  ]

  const stats = [
    {title: '고객 만족도', value: 98, percentage: true},
    {title: '고객 지원', value: 24, percentage: false},
    {title: '서비스 가동률', value: 99.9, percentage: true},
    {title: '지원 언어', value: 15, percentage: false},
  ]

  return (
    <>
      <ContentHeader title="대시보드" description="오늘의 주요 지표와 통계를 확인하세요" />
      
      <div className="dashboard-grid">
        {dashboardCards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      <div className="stats-section">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </>
  )
}

export default Dashboard