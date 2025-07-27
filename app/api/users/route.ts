import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip') || '0'

    const where = role ? { role } : {}
    const take = limit ? parseInt(limit) : undefined

    const users = await prisma.user.findMany({
      where,
      take,
      skip: parseInt(skip),
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}