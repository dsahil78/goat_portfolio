# Portfolio audit — September 28, 2026

Audience: Senior / Lead AI Product Manager. The user approved illustrative reconstructions based on verified case-study and résumé content.

## Findings and implementation scope

| Area | Finding | Change |
| --- | --- | --- |
| Homepage | Clear positioning and three useful highlights; the document graphic is a generic linear sequence | Keep the concise structure; replace the lead visual with a Mermaid diagram showing the confidence decision and human review |
| Work directory | Four stories are easy to find, but the page is almost entirely text | Add a visual entry for each story and explicit focus areas while retaining the comparison-friendly summaries and outcomes |
| ProductSquads | Strong evaluation and routing decisions are buried in prose | Add the operational workflow and a separate evaluation/release loop; distinguish system output from reviewer feedback |
| Closphere | The ERP-agnostic architecture and data-freshness failure mode are hard to picture | Show source systems, a canonical model, reconciliation, and visible exceptions |
| Filo | Local matching constraints and session continuity are explained but not visualized | Show student intake, matching inputs, tutor connection, and session experience |
| Supreme Components | Guardrails are central to the story but the existing graphic omits the decision boundary | Visualize account context, policy checks, review, and quote-to-order routing |
| Long-form reading | Case studies use one repeated text layout with little visual orientation | Add an early system view, reading time, original interface references where available, and a closing contact path |
| Projects | Interfaces are too small to inspect; NXTai’s product-memory structure is only described | Make interface images open at full size and add an illustrative NXTai workflow |
| About | Career history is credible but technical strengths require reading the full biography | Add compact, sourced AI/engineering capabilities and the résumé certifications; make the existing experience timeline more scannable |
| Navigation | Experiments and About return visitors to homepage sections even when dedicated pages exist | Point header links to the dedicated pages, retaining homepage anchor CTAs and current-page indicators |
| Accessibility | Previous suite passed; SVG diagrams introduce new readability and fallback needs | Generate desktop/mobile diagrams, include descriptive alternatives and expandable text explanations, and test without JavaScript |
| Performance | A browser-side Mermaid renderer would add avoidable runtime work | Generate SVGs ahead of deployment; ship images and semantic HTML, not Mermaid runtime code |
| Content integrity | Scope and outcomes are verified; source details are uneven | Preserve attribution, distinguish prototypes from production, label every reconstructed system illustrative, and invent no infrastructure or evaluation results |
| Metadata | Social image alt text still uses an older role label; the 404 skip target lacks explicit focusability | Align metadata wording and repair the 404 focus target |

## Design constraints preserved

Light warm-white theme, restrained blue, Inter/Inter Tight, no numbered homepage eyebrows, no role eyebrow above the name, three homepage case studies, Supreme Components only in Work, corrected contact layout, both degrees, and under-seven-day Closphere onboarding.

No fabricated charts, customer quotes, logos, architectures, or measurement series. Diagrams communicate logical workflows rather than claiming to document a deployed technology stack.

## Verification

Final results and exact limits are recorded in `docs/VALIDATION.md`. Coverage includes all eight content routes, the 404, diagram assets and text alternatives, active navigation, résumé, metadata, mobile, 200% text, reduced motion, keyboard use, and no-JavaScript reading. Hosted deployment and field performance remain outside this local audit.

Mermaid references used: [rendering API](https://mermaid.js.org/config/usage.html), [accessible titles and descriptions](https://mermaid.js.org/config/accessibility.html), and [flowchart syntax](https://mermaid.js.org/syntax/flowchart.html).
