import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    await fetch(
      `https://api.vercel.com/v1/projects/${process.env.PROJECT_ID}/deployments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_DEPLOY_TOKEN}`,
        },
      }
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to trigger deployment' }, { status: 500 })
  }
} 