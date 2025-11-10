// lib/spotify.ts
import axios from "axios"

let accessToken: string | null = null
let tokenExpiresAt: number = 0

export async function getSpotifyAccessToken() {
  const now = Date.now()

  if (accessToken && now < tokenExpiresAt) {
    return accessToken
  }

  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  accessToken = res.data.access_token
  tokenExpiresAt = now + res.data.expires_in * 1000

  return accessToken
}