import { ImageResponse } from 'next/og';
export const alt = 'Sahil Dua: Technical Product Manager & Founder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#FAFAF7', color: '#111827', padding: '64px 72px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, color: '#1D4ED8' }}><span>TECHNICAL PRODUCT MANAGER & FOUNDER</span><span>duasahil.com</span></div>
      <div style={{ display: 'flex', fontSize: 134, letterSpacing: '-7px', fontWeight: 700 }}>Sahil Dua<span style={{ color: '#1D4ED8' }}>.</span></div>
      <div style={{ display: 'flex', fontSize: 35, maxWidth: 920, lineHeight: 1.3 }}>I build AI products for complex, real-world workflows.</div>
      <div style={{ display: 'flex', gap: 55, borderTop: '1px solid #E5E7EB', paddingTop: 24, color: '#4B5563', fontSize: 19 }}><span>ProductSquads · AI systems</span><span>Closphere · Founder</span><span>Filo · US launch</span></div>
    </div>, size,
  );
}
