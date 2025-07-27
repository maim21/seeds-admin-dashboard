import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [totalCourses, totalStudents, activeInstructors, newSignups] = await Promise.all([
      prisma.course.count(),
      prisma.user.count({ where: { role: 'student' } }),
      prisma.user.count({ where: { role: 'instructor' } }),
      prisma.user.count({
        where: {
          role: 'student',
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ])
    return NextResponse.json({
      totalCourses,
      totalStudents,
      activeInstructors,
      newSignups
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 })
  }
}