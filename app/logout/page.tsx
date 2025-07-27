'use client'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth)
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
        router.push('/login')
      }
    }

    handleLogout()
  }, [router])

  return <main
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #164a41 50%, #0f172a 100%)',
      }}
      className="min-h-screen flex items-center justify-center"
    >
      <section
        aria-label="Loading Spinner"
        className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"
      />
    </main>
}