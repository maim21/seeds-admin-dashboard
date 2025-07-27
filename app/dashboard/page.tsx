'use client'
import React from "react"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, BookOpen , Users , UserCheck, Settings, Trees, LogOut, BookOpenCheck, GraduationCap, UserPlus} from 'lucide-react';

import '../styles/dashboard.css'

interface Course {
  id: number
  title: string
  instructor: string
  enrolled: number
  status: string
  createdAt: string
}

interface DashboardStats {
  totalCourses: number
  totalStudents: number
  activeInstructors: number
  newSignups: number
}

interface StatCardProps {
  title: string
  value: number
  icon?: React.ElementType;
  text: string
  colorClass: string
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalStudents: 0,
    activeInstructors: 0,
    newSignups: 0
  })

  const [courses, setCourses] = useState<Course[]>([])
  const router = useRouter()

  useEffect(() => { fetchDashboardData() }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, coursesRes] = await Promise.all([fetch('/api/dashboard/stats'), fetch('api/courses?limit=5')])
      const statsData = await statsRes.json()
      const coursesData = await coursesRes.json()

      setStats(statsData)
      setCourses(coursesData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/logout')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
  const StatCard: React.FC<StatCardProps> = ({ title, value, icon:Icon ,text, colorClass }) => (
    <article className={`stat-card ${colorClass}`}>
      <header className="stat-card-header"> {Icon && (
        <span className="stat-card-icon-wrapper"><Icon className="stat-card-icon"/></span>)}
      </header>
      <p className="stat-card-value">{value.toLocaleString()}</p>
      <h3 className="stat-card-title">{title}</h3>
      <p className="stat-card-text">{text}</p>
    </article>
  )
  return (
    <main className="dashboard-container">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <header className="sidebar-header">
          <h1 className="sidebar-title"><span><Trees/>Navigate</span></h1>

          <button onClick={() => setSidebarOpen(false)}
            className="sidebar-close-btn"
            aria-label="Close sidebar">✕</button>
        </header>
        <nav className="sidebar-nav">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true, href: '/dashboard' },
            { icon: BookOpen, label: 'Courses', href: '/api/courses' },
            { icon: Users, label: 'Users', href: '/api/users' },
            { icon: UserCheck, label: 'Instructors', href: '/dashboard' },
            { icon: Settings, label: 'Settings', href: '/dashboard' },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <section className="main-content">
        <header className="top-bar">
          <section className="top-bar-left">
            <button
              onClick={() => setSidebarOpen(true)}
              className="menu-btn"
              aria-label="Open sidebar"
            >☰</button>
            <h2 className="page-title">Seed's E-Learning Dashboard</h2>
          </section>

          <section className="top-bar-right">
            <address className="user-info">
              <p className="user-email">{auth.currentUser?.email}</p>
              <p className="user">Admin Maim</p>
            </address>
            <button onClick={handleLogout} className="logout-btn"><LogOut className="logout-btn-icon"/>Logout</button>
          </section>
        </header>
        <section className="dashboard-main">
          <section className="stats-grid" role="region" aria-label="Statistics">
            <StatCard
              title="Total Courses"
              text='Active learning programs across all tracks'
              value={stats.totalCourses}
              icon={BookOpen}
              colorClass="purple" />
            <StatCard
              title="Total Students"
              text='Future innovators in our ecosystem'
              value={stats.totalStudents}
              icon={GraduationCap}
              colorClass="blue" />
            <StatCard
              title="Active Instructors"
              text='Expert mentors and industry leaders'
              value={stats.activeInstructors}
              icon={UserCheck}
              colorClass="cyan" />
            <StatCard
              title="New Signups This Week"
              text='Growing our innovation community'
              value={stats.newSignups}
              icon={UserPlus}
              colorClass="green" />
          </section>
          <section className="courses-table-container">
            <header className="courses-table-header">
              <h3 className="courses-table-title">Latest Courses</h3></header>
            <section className="courses-table-wrapper">
              <table className="courses-table">
                <thead>
                  <tr>
                    <th scope="col">Course Title</th>
                    <th scope="col">Instructor</th>
                    <th scope="col">Enrolled</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id}>
                      <td className="course-title">{course.title}</td>
                      <td className="course-instructor">{course.instructor}</td>
                      <td className="course-enrolled">
                        <span className="course-enrolled-count">{course.enrolled}</span>
                      </td>
                      <td>
                        <span className={`course-status ${course.status.toLowerCase()}`}>
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        </section>
      </section>
      <button className={`mobile-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      />
    </main>
  )
}