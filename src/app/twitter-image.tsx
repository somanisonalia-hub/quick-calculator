import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-static';

export const alt = 'Quick Calculator - Free Online Calculators';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Calculator Icon */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            marginBottom: '40px',
          }}
        >
          {/* Calculator Display */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#1a1a2e',
              borderRadius: '12px',
              padding: '20px 40px',
              marginBottom: '24px',
              minWidth: '280px',
              justifyContent: 'flex-end',
            }}
          >
            <span style={{ color: '#4ade80', fontSize: '48px', fontWeight: 'bold' }}>
              123.45
            </span>
          </div>
          
          {/* Calculator Buttons Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              width: '280px',
              justifyContent: 'center',
            }}
          >
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '58px',
                  height: '58px',
                  backgroundColor: ['÷', '×', '-', '+', '='].includes(btn) ? '#667eea' : '#f3f4f6',
                  color: ['÷', '×', '-', '+', '='].includes(btn) ? '#ffffff' : '#1f2937',
                  borderRadius: '12px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                {btn}
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#ffffff',
              margin: '0 0 16px 0',
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Quick Calculator
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
            }}
          >
            Free Online Calculators for Math, Finance & Health
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
