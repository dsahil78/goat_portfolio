import { ImageResponse } from 'next/og';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export default function Icon() {
  return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',background:'#FAFAF7',color:'#16181D',fontSize:80,fontWeight:600,letterSpacing:'-5px'}}>sd<span style={{color:'#1D4ED8'}}>.</span></div>,size);
}
