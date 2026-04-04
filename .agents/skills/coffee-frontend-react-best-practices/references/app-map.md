# App Map

## Routes

- `src/app/page.tsx`: marketing-style landing page with static hero content
- `src/app/menu/page.tsx`: client page that fetches menus in `useEffect`
- `src/app/menu/[id]/page.tsx`: client detail page that fetches menu and addon data, then mutates cart
- `src/app/cart/page.tsx`: client cart page with duplicated fetch logic and mutation-followed-by-refetch handlers
- `src/app/checkout/page.tsx`: client checkout flow with pickup state and order submission
- `src/app/orders/page.tsx`: order history route
- `src/app/profile/page.tsx`: profile route
- `src/app/admin/page.tsx`, `src/app/admin/menu/page.tsx`, `src/app/admin/orders/page.tsx`: admin surface
- `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`, `src/app/(auth)/logout/page.tsx`: auth routes

## Shared UI

- `src/components/layout/navbar.tsx`: global navigation, auth-aware links, cart badge shell
- `src/components/cart/cart-badge.tsx`: fetches cart count after auth is available
- `src/components/pickup/pickup-time.tsx`: checkout input helper
- `src/components/features/*`: auth forms

## Client State and Cross-Cutting Concerns

- `src/context/auth-context.tsx`: loads current user in an effect, exposes `user`, `loading`, `logout`, and `loadUser`
- `src/lib/api/client.ts`: central fetch wrapper, reads token from `localStorage`, redirects on 401
- `src/lib/api/**/*.service.ts`: endpoint-specific fetch helpers

## Practical Consequences

- Because auth and API tokens depend on browser storage today, some flows may remain client-bound unless token handling moves to cookies/server reads.
- Route files marked `"use client"` should earn that boundary. If only a small widget needs browser APIs, split it out.
- Repeated fetches after every mutation are easy to ship but often the first place to improve perceived speed in this app.
