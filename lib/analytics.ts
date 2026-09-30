import posthog from 'posthog-js';

export const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

type EventProperties = {
  case_study_opened: { slug: string };
  case_study_link_clicked: { slug: string; location: string };
  resume_downloaded: { location: string };
  contact_clicked: { channel: string; location: string };
  external_link_clicked: { url: string; label: string };
  project_demo_opened: { project: string };
  project_website_opened: { project: string };
  project_details_opened: { project: string; location: string };
  navigation_clicked: { destination: string; label: string; location: string };
  section_jump_clicked: { section: string; location: string };
  diagram_viewed: { case_study: string; diagram: string };
  diagram_opened: { diagram: string };
  diagram_explanation_toggled: { diagram: string; expanded: boolean };
  interface_image_opened: { asset: string; label: string };
  section_viewed: { section: string };
  scroll_depth_reached: { percent: number };
  reading_time_reached: { seconds: number };
  page_engagement: { visible_seconds: number; max_scroll_percent: number; reason: string };
  case_study_end_reached: { slug: string };
  not_found_viewed: Record<string, never>;
};

export function registerOutreachRef() {
  if (!analyticsEnabled || typeof window === 'undefined') return;
  const ref = new URLSearchParams(window.location.search).get('ref');
  // A company/campaign slug, never free-form recruiter names or email addresses.
  if (ref && /^[a-z0-9][a-z0-9_.-]{0,79}$/i.test(ref)) {
    // Unlike register(), this cannot attach a past company's ref to a new session.
    posthog.register_for_session({ ref });
  }
}

export function capturePortfolioEvent<E extends keyof EventProperties>(event: E, properties: EventProperties[E], path = window.location.pathname) {
  if (!analyticsEnabled) return;
  posthog.capture(event, { ...properties, page_path: path });
}
