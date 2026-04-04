---
name: coffee-frontend-react-best-practices
description: Project-specific React and Next.js performance and architecture guidance for the coffee-frontend app. Use when Codex is reviewing, refactoring, or adding code in this repository's App Router pages, client components, auth/cart/menu flows, API service modules, or stateful UI, especially to reduce client-side waterfalls, unnecessary re-renders, duplicated fetches, oversized client boundaries, and navigation or hydration inefficiencies.
---

# Coffee Frontend React Best Practices

Use this skill to adapt Vercel-style React and Next.js performance guidance to this repository instead of applying generic advice.

## Workflow

1. Read `references/app-map.md` before changing architecture.
2. Identify whether the target file is a route, shared component, context provider, or API helper.
3. Prioritize the highest-impact fixes first:
   - move data fetching out of client `useEffect` when the page can be server-rendered
   - parallelize independent requests
   - shrink client component boundaries
   - remove duplicated state, duplicated fetch logic, and effect-driven derived state
4. Preserve the current product behavior and visual language unless the request explicitly asks for UI redesign.
5. When suggesting or implementing a refactor, cite the matching rule family from the upstream Vercel skill by prefix:
   - `async-*`
   - `bundle-*`
   - `server-*`
   - `client-*`
   - `rerender-*`
   - `rendering-*`
   - `js-*`
   - `advanced-*`

## Project Heuristics

- Prefer server components for route-level data loading in `src/app/**/page.tsx` when browser-only APIs are not required.
- Keep `"use client"` at the smallest possible leaf. Do not place whole pages on the client just to call `useRouter`, `useEffect`, or `localStorage`.
- Treat `src/lib/api/*.service.ts` modules as fetch helpers, not state containers.
- If a page loads multiple independent resources, start requests together and await them together.
- Replace duplicated `loadX` functions and repeated fetch blocks with a single reusable function or server-side fetch path.
- Derive display values during render when possible; avoid storing values that can be calculated from existing state.
- Use navigation primitives intentionally:
  - prefer `<Link>` for navigable UI
  - reserve `router.push()` for imperative flows after mutations
- Keep auth/cart state consistent across shared UI; if badge, navbar, cart, and checkout all need the same freshness guarantees, solve that once rather than each component polling separately.

## Hotspots

- Menu listing and menu detail pages currently fetch on the client and are strong candidates for server-side loading plus smaller client islands.
- Cart-related UI has duplicated loading logic and mutation-followed-by-refetch behavior; review this first for `rerender-*` and `async-*` fixes.
- Auth state is loaded in a provider effect and influences global navigation. Be careful about hydration, redirects, and repeated fetches.
- Checkout and mutation flows should keep urgent interactions responsive; use transitions when non-urgent UI updates become expensive.

## References

- Read `references/app-map.md` for the route and component inventory.
- Read `references/refactor-playbook.md` for concrete refactor patterns to apply in this repo.
- For deeper rule details, consult the upstream skill at `C:\Users\manus\.agents\skills\vercel-react-best-practices`.
