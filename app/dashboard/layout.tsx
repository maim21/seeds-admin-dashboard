'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
  return (
    <main
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
  );
}

  return <>{children}</>
}