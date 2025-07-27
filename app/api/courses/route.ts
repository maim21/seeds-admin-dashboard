import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip') || '0'
    const status = searchParams.get('status')

    const where = status ? { status } : {}
    const take = limit ? parseInt(limit) : undefined

    const courses = await prisma.course.findMany({
      where,
      take,
      skip: parseInt(skip),
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}