import { ImageResponse } from 'next/og'
 
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
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2563eb',
          borderRadius: 6,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Calculator body */}
          <rect x="8" y="6" width="16" height="20" rx="1.5" fill="white" opacity="0.95"/>
          
          {/* Display screen */}
          <rect x="10" y="8" width="12" height="4" rx="0.5" fill="#2563eb" opacity="0.2"/>
          
          {/* Button grid - 3x3 */}
          {/* Row 1 */}
          <circle cx="12" cy="15.5" r="1" fill="#2563eb"/>
          <circle cx="16" cy="15.5" r="1" fill="#2563eb"/>
          <circle cx="20" cy="15.5" r="1" fill="#2563eb"/>
          
          {/* Row 2 */}
          <circle cx="12" cy="18.5" r="1" fill="#2563eb"/>
          <circle cx="16" cy="18.5" r="1" fill="#2563eb"/>
          <circle cx="20" cy="18.5" r="1" fill="#2563eb"/>
          
          {/* Row 3 */}
          <circle cx="12" cy="21.5" r="1" fill="#2563eb"/>
          <circle cx="16" cy="21.5" r="1" fill="#2563eb"/>
          <circle cx="20" cy="21.5" r="1" fill="#2563eb"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}

