import type { CaseStudy } from '@/content/case-studies';
export function SocialImage({ study }: { study?: CaseStudy }) {
  return <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#FAFAF7',color:'#16181D',padding:'56px 64px'}}>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:18,color:'#4A505C'}}><span>{study ? study.company.toUpperCase() : 'TECHNICAL PRODUCT MANAGER · AI PLATFORMS'}</span><span>duasahil.com</span></div>
    <div style={{display:'flex',fontSize:study?48:88,letterSpacing:'-3px',fontWeight:600}}>Sahil Dua<span style={{color:'#1D4ED8'}}>.</span></div>
    <div style={{display:'flex',fontSize:study?52:46,lineHeight:1.16,maxWidth:1000,letterSpacing:'-1px'}}>{study?.title || 'I build AI that enterprises trust in production.'}</div>
    <div style={{display:'flex',borderTop:'1px solid #E6E4DE',paddingTop:24,gap:64}}>
      {(study ? [study.company === 'Filo' ? study.metrics[1] : study.metrics[0]] : [{value:'100K+',label:'documents/month'},{value:'63',label:'paying customers'},{value:'$1.5M',label:'ARR in six months'}]).map(metric => <div key={metric.label} style={{display:'flex',flexDirection:'column',gap:8}}><span style={{fontSize:44,color:'#1D4ED8'}}>{metric.value}</span><span style={{fontSize:18,color:'#4A505C'}}>{metric.label}</span></div>)}
    </div>
  </div>;
}
