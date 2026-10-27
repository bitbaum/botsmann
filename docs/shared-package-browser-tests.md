# Shared package browser checks

`pnpm exec playwright test --config=playwright.shared.config.ts` starts the real
local app and exercises the committed published article at phone and desktop
widths, server-rendered reading without JavaScript, article navigation, and a
contact request that cannot be delivered. The contact fixture has no database
credentials and must show an error while retaining the draft. It must never
claim that an unsaved request was received.

The `browser-smoke.yml` workflow runs these journeys for changes and dispatches,
providing the browser evidence required by Fleet's shared package rollout gate.
It uses no production account, recipient or paid model. These checks do not
certify actual email delivery, Supabase registration or every bot/chat journey.
