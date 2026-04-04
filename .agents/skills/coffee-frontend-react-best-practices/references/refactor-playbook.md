# Refactor Playbook

## 1. Convert Route Fetching to Server Loading

Use for `src/app/**/page.tsx` files that fetch initial data in `useEffect`.

- Apply `server-parallel-fetching`, `server-serialization`, and `async-parallel`.
- Fetch route data in an async server page when browser-only state is not needed for the first paint.
- Pass only the minimal serialized data into a smaller client child for interactive controls.

Good candidates in this repo:

- `src/app/menu/page.tsx`
- `src/app/menu/[id]/page.tsx`

## 2. Collapse Duplicated Loader Logic

Use when the same async fetch body appears more than once in a component.

- Apply `rerender-derived-state-no-effect` and `js-early-exit`.
- Keep one `loadX` helper and reuse it for mount and post-mutation refreshes.
- If mutations only change one item, prefer optimistic local updates before a full refetch when correctness permits.

Good candidate in this repo:

- `src/app/cart/page.tsx`

## 3. Shrink Global Client Boundaries

Use when a whole page or layout is client-only for a small reason.

- Apply `bundle-conditional`, `bundle-dynamic-imports`, and `rerender-no-inline-components` when relevant.
- Move browser-only logic into a small child component.
- Keep static markup, images, and links on the server side whenever possible.

## 4. Prevent Waterfalls in Detail Screens

Use when a component fetches multiple resources sequentially inside one effect.

- Apply `async-parallel` first.
- Start all independent requests before the first `await`.
- If one request depends on another, keep only the dependent part sequential.

Good candidate in this repo:

- `src/app/menu/[id]/page.tsx`

## 5. Keep Shared State Fresh Without Scattershot Fetching

Use when navbar, badge, cart, and checkout all need related data freshness.

- Apply `client-swr-dedup`, `client-event-listeners`, and `rerender-split-combined-hooks` conceptually even if SWR is not yet installed.
- Prefer a shared cache or central refresh point over each component owning its own fetch timing.
- If adding a library is out of scope, create a narrow shared abstraction before duplicating more effects.

## 6. Use Navigation and Transitions Intentionally

Use when UI performs async work then redirects or updates large screens.

- Prefer `<Link>` for normal navigation.
- Use `startTransition` around non-urgent state updates if large rerenders hurt responsiveness.
- Keep loading and error UI close to the mutation that triggered them.
