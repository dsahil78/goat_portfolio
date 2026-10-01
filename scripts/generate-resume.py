"""Build the approved-facts résumé. Requires reportlab and fontTools for this offline tool."""
from pathlib import Path
from tempfile import TemporaryDirectory
from html import escape
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfgen import canvas
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as PDFont

ROOT = Path(__file__).resolve().parents[1]
with TemporaryDirectory() as font_dir:
    for name, weight in [('Inter', 400), ('InterSemi', 600)]:
        font = TTFont(ROOT / 'public/fonts/inter-latin-variable.woff2')
        font = instantiateVariableFont(font, {'wght': weight})
        font.flavor = None
        target = Path(font_dir) / (name + '.ttf')
        font.save(target)
        pdfmetrics.registerFont(PDFont(name, str(target)))
    pdfmetrics.registerFontFamily('Inter', normal='Inter', bold='InterSemi')
    pdf = canvas.Canvas(str(ROOT / 'public/resume.pdf'), pagesize=(612, 792))
    pdf.setTitle('Sahil Dua | Technical Product Manager, AI Platforms')
    pdf.setAuthor('Sahil Dua')
    y = 752
    def line(text, size=9.2, leading=12, space=5, bold=False, color='#16181D'):
        global y
        style = ParagraphStyle('body', fontName='InterSemi' if bold else 'Inter', fontSize=size, leading=leading, textColor=color)
        para = Paragraph(text, style)
        _, h = para.wrap(532, 720)
        if y-h < 32:
            raise RuntimeError('Résumé exceeds one page; edit copy rather than clipping it.')
        para.drawOn(pdf, 40, y-h)
        y -= h+space
    def heading(text):
        global y
        y -= 5
        line(text, size=10, leading=13, bold=True, color='#1D4ED8', space=6)
    line('Sahil Dua', size=26, leading=30, bold=True, space=4)
    line('Technical Product Manager, AI Platforms',size=12,leading=16,space=5)
    line('sahildua033@gmail.com · duasahil.com · linkedin.com/in/sahildua78 · github.com/dsahil78',size=8,leading=11,space=10)
    line('I build AI that enterprises trust in production. Product experience across document AI, enterprise SaaS, and marketplaces, including founding an inventory platform that exited through a technology/IP sale.',size=9.5,leading=13,space=6)
    heading('EXPERIENCE')
    line('ProductSquads · Lead Product Manager | Feb 2025 to Sep 2025',bold=True)
    line('PE-backed enterprise document AI. Delivered with 2 engineering pods and a 50-person human review team. Processed 100K+ documents/month at 95%+ accuracy: field-level exact match, before human review. Turnaround improved 70% at under 1 cent per page.')
    line('Replaced 6+ planned per-format parsers with schema-driven retrieval. Built an evaluation framework spanning per-tenant golden sets, LLM-as-judge, human review, and online monitoring. Release decisions were made against golden sets.',space=9)
    line('Closphere · Founder &amp; Product Lead | Dec 2023 to Jan 2025',bold=True)
    line('Led a 12-person team and discovery with 50+ customers. Reached 63 paying customers, 1K+ users, and 112 locations before a technology/IP sale.')
    line('Inventory record accuracy improved from 75% to 95%; stockouts fell 32%; reconciliation effort fell 70%+. Onboarding moved from 6+ weeks to under 7 days. Referrals drove approximately 30% of new business.',space=9)
    line('Supreme Components · Product Manager | Aug 2023 to Dec 2023',bold=True)
    line('Product work across a quoting workflow handling 8K RFQs/month. In-stock quotes moved from 18 hours to under 1 hour; out-of-stock turnaround moved from 15 days to under 3 days. Separately, shipment tracking and forecasting reduced logistics costs by 22%.',space=9)
    line('Filo · Product Manager (Founding US PM) | Aug 2022 to Aug 2023',bold=True)
    line('The US marketplace went on to reach 120K users and $1.5M ARR in six months. 98% of US requests matched in under 45 seconds against a 60-second target. Conducted 100+ user interviews; activation increased 35% and conversion reached 3%+.',space=7)
    heading('SELECTED EXPERIMENTS')
    line('<b>Kindred · Class project.</b> Dempsey Startup Competition investment round, top 39 of approximately 200; Best Marketplace Idea, sponsored by eBay.')
    line('<b>TalentSphere.</b> Most Innovative and Viable Product, UW MSIM Hackathon. <b>Rotten Tom-AI-toes.</b> Evaluation workflows across 6 trust dimensions and 17 foundation models.',space=5)
    heading('EDUCATION')
    line('<b>University of Washington.</b> MS Information Management, Product &amp; AI | Sep 2025 to Aug 2026')
    line('<b>Amity University.</b> BTech Computer Science and Engineering | 2016 to 2020',space=5)
    heading('TECHNOLOGY & CERTIFICATIONS')
    line('Python · React · Qdrant · Llama · Redis · Postgres · AWS')
    line('Microsoft Azure Solutions Architect Expert (AZ-305)<br/>Microsoft AI &amp; ML Engineering Professional')
    pdf.save()
    print('Résumé generated. Bottom margin:',round(y),'points.')
