import posthog from 'posthog-js';
import { registerOutreachRef } from '@/lib/analytics';

if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2025-05-24',
    // Keep the requested defaults, but avoid inserting SDK scripts into React's body.
    external_scripts_inject_target: 'head',
    capture_exceptions: true,
    capture_pageview: 'history_change',
    capture_pageleave: true,
    capture_heatmaps: true,
    rageclick: true,
    capture_dead_clicks: true,
    capture_performance: { web_vitals: true, network_timing: false },
    // Anonymous portfolio browsing; no identity, email, or person profile is set.
    person_profiles: 'never',
    autocapture: {
      dom_event_allowlist: ['click'],
      css_selector_ignorelist: ['input', 'textarea', 'select', 'form', '[contenteditable]', '[data-private]', '.ph-no-capture'],
      element_attribute_ignorelist: ['value'],
    },
    mask_all_text: true,
    mask_all_element_attributes: true,
    disable_session_recording: false,
    enable_recording_console_log: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[contenteditable], [data-private], .ph-mask',
      blockSelector: '.ph-no-capture',
      recordCrossOriginIframes: false,
      recordHeaders: false,
      recordBody: false,
    },
    // Keep this integration limited to analytics, replay, heatmaps, and errors.
    disable_surveys: true,
    disable_conversations: true,
    disable_product_tours: true,
    disable_web_experiments: true,
    advanced_disable_feature_flags: true,
    loaded: () => {
      posthog.register({
        site: 'sahil-dua-portfolio',
        analytics_schema_version: 1,
        environment: ['localhost', '127.0.0.1'].includes(window.location.hostname) ? 'local' : 'hosted',
      });
      // The loaded callback runs before the first automatic pageview.
      registerOutreachRef();
    },
  });
  registerOutreachRef();
}
