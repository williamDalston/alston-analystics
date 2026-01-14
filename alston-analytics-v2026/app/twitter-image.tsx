import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Alston Analytics — Data clarity. Executive decisions.';
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
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #02040A 0%, #0B1321 50%, #050A0E 100%)',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#E0F2FE',
            lineHeight: 1.1,
            marginBottom: 24,
            textShadow: '0 0 60px rgba(224, 242, 254, 0.3)',
          }}
        >
          Alston Analytics
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: '#E2D1C3',
            opacity: 0.9,
            marginBottom: 48,
          }}
        >
          Data clarity. Executive decisions.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#94A3B8',
            fontFamily: 'monospace',
          }}
        >
          Strategic consulting · Power BI architecture · Sovereign thinking
        </div>

        {/* Decorative line */}
        <div
          style={{
            position: 'absolute',
            bottom: '120px',
            left: '80px',
            right: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.4), rgba(224, 242, 254, 0.6), rgba(0, 240, 255, 0.4), transparent)',
          }}
        />

        {/* Dots decoration */}
        <div
          style={{
            position: 'absolute',
            top: '200px',
            right: '200px',
            display: 'flex',
            gap: '40px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#00F0FF',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)',
            }}
          />
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#7DD3FC',
              boxShadow: '0 0 15px rgba(125, 211, 252, 0.5)',
            }}
          />
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#E0F2FE',
              boxShadow: '0 0 25px rgba(224, 242, 254, 0.7)',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
