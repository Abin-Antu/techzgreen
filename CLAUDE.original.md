# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite HMR)
npm run build     # tsc type-check + Vite production build
npm run lint      # ESLint
npm run preview   # serve production build locally
```

No test suite exists yet.

## Environment

Copy `env` to `.env.local` (or `.env`) — Vite requires the `VITE_` prefix:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

The `env` file at the repo root contains the real keys (not gitignored, treat with care).

## Architecture

**Stack:** React 19 + TypeScript, Vite, Tailwind CSS v4 (via `@tailwindcss/vite`), Supabase (auth + DB + storage), React Router v7, Lucide icons.

**Auth flow:** `AuthContext` (`src/context/AuthContext.tsx`) wraps the whole app. It holds `user` (Supabase auth user), `profileRole` (`'admin' | 'user'` from `profiles` table), and `totalPoints` (summed from `points_ledger`). Auth is Google OAuth only — `signInWithGoogle()` redirects to `/dashboard`. Role gates are done by checking `profileRole` from context, not from the JWT.

**Points system:** Points live in `points_ledger` (append-only ledger, never a mutable counter). `AuthContext` exposes `refreshPoints()` — call this after any action that awards or deducts points (checkout, waste submission approval). The `user_total_points` view is the primary read path; direct ledger sum is the fallback.

**Cart:** `CartContext` (`src/context/CartContext.tsx`) is in-memory only — no persistence. Cart is cleared on `clearCart()` after successful checkout.

**Checkout & points redemption:** `Checkout.tsx` fetches `app_settings.point_to_rs` to convert points → rupee discount. Max redeemable points are capped at `min(totalPoints, floor(totalAmount / pointToRs))`.

**Admin vs user dashboards:** `/admin` → `AdminDashboard.tsx`, `/dashboard` → `UserDashboard.tsx`. Admin access is not route-guarded by a wrapper component — each page checks `profileRole === 'admin'` internally and redirects if not. Admin email constant (`ADMIN_EMAIL = 'admin@teczgreen.com'`) is hardcoded in both dashboard files; update both if it changes.

**Order tracking:** Orders table has `shipped`, `shipped_at`, `expected_delivery`, `admin_notes` columns (added via `order_tracking_migration.sql`). Admin sets these in `AdminDashboard`; users see a 3-step timeline (Placed → Shipped → Delivered) in `UserDashboard`.

**Supabase DB tables:**
- `profiles` — extends `auth.users`, stores `role`
- `points_ledger` — append-only points log; `user_total_points` view aggregates
- `products` — shop inventory
- `orders` + `order_items` — purchases
- `user_addresses` — saved shipping addresses (latest used as checkout default)
- `waste_submissions` — photo submissions for points; reviewed by admin
- `events` + `event_registrations` — community events with registration cap
- `banners` — admin-managed homepage carousel
- `app_settings` — key/value config (e.g. `point_to_rs`)

Storage buckets: `waste-images`, `banners`, `events` (all public).

**`stitch-components/`** — reference UI components generated from a design tool (Stitch). Not used in production routing except `/stitch-landing`. Treat as design reference, not production code.

**`src/lib/mockData.ts`** — leftover mock data, not used in active pages (all data comes from Supabase).

## DB migrations

Run SQL files directly in the Supabase SQL editor:
- `schema.sql` — full initial schema
- `order_tracking_migration.sql` — adds tracking columns to `orders`
