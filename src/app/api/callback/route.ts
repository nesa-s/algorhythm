import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Missing code from Spotify' }, { status: 400 })
  }

  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI || '')

    const authHeader = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64')

    const response = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const { access_token } = response.data

    // Option 1: Redirect with token in cookies or params (you can customize this)
    const redirectUrl = new URL('/success', req.url)
    redirectUrl.searchParams.set('token', access_token)

    return NextResponse.redirect(redirectUrl)

  } catch (error) {
    console.error('Spotify authentication error:', error)
    return NextResponse.json({ error: 'Failed to authenticate with Spotify' }, { status: 500 })
  }
}