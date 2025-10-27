import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'HIIS-UAE Logo'
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        H
      </div>
    ),
    {
      ...size,
    }
  )
}