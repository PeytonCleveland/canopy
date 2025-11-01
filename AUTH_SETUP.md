# Better Auth Setup Instructions

This document outlines the steps to complete the Better Auth integration for the Canopy dashboard.

## Completed Setup

The following components have been implemented:

### 1. Authentication Packages
- ✅ `@canopy/auth` - Better Auth server configuration with email OTP
- ✅ `@canopy/email` - Resend email service with OTP templates
- ✅ `@canopy/db` - Database schema with Better Auth tables

### 2. Dashboard Integration
- ✅ API Routes: `/apps/dashboard/src/app/api/auth/[...all]/route.ts`
- ✅ Sign-in UI: `/apps/dashboard/src/app/sign-in/page.tsx`
- ✅ Session Management: `/apps/dashboard/src/lib/auth.ts`
- ✅ Protected Route Middleware: `/apps/dashboard/src/middleware.ts`
- ✅ Sign-out Component: `/apps/dashboard/src/components/sign-out-button.tsx`

### 3. UI Components
- ✅ Input component with label and error handling
- ✅ OTP verification UI with 6-digit code input
- ✅ Sign-in/sign-out flow

## Required Manual Steps

### Push Database Schema to Neon

The database schema needs to be pushed to your Neon database. Run the following command:

```bash
pnpm db:push
```

This will create the following tables in your Neon PostgreSQL database:
- `user` - User accounts
- `session` - User sessions
- `account` - OAuth provider accounts (for future use)
- `verification` - OTP verification tokens

**Prerequisites:**
- Ensure `DATABASE_URL` environment variable is set in your `.env` file
- The DATABASE_URL should point to your Neon PostgreSQL database

### Environment Variables

Ensure the following environment variables are set in your `.env` file:

```env
# Database
DATABASE_URL=postgresql://user:password@host/database

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# App URL (for auth callbacks)
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## Testing the Authentication Flow

Once the database schema is pushed and environment variables are configured:

1. **Start the dashboard:**
   ```bash
   pnpm dev:dashboard
   ```

2. **Test sign-in flow:**
   - Navigate to `http://localhost:3001`
   - You should be redirected to `/sign-in`
   - Enter your email address
   - Check your email for the 6-digit OTP code
   - Enter the code to complete sign-in
   - You should be redirected to the dashboard home page

3. **Test session persistence:**
   - Refresh the page
   - You should remain signed in

4. **Test sign-out:**
   - Click the "Sign out" button in the dashboard header
   - You should be redirected to `/sign-in`

5. **Test protected routes:**
   - Try accessing the dashboard while signed out
   - You should be automatically redirected to `/sign-in`

## Architecture Overview

### Authentication Flow

1. **Sign-in Request:**
   - User enters email on `/sign-in`
   - Client calls `authClient.signIn.email({ email })`
   - Better Auth generates OTP and sends email via Resend
   - User receives email with 6-digit code

2. **OTP Verification:**
   - User enters the 6-digit code
   - Client calls `authClient.signIn.emailOtp.verifyCode({ email, otp })`
   - Better Auth verifies the code and creates a session
   - Session cookie is set automatically
   - User is redirected to the dashboard

3. **Session Management:**
   - Sessions are stored in the database
   - Session cookies are HTTP-only and secure
   - Middleware checks session on every request
   - Server components can access session via `getSession()` or `requireAuth()`

4. **Sign-out:**
   - User clicks "Sign out" button
   - Client calls `authClient.signOut()`
   - Session is deleted from database
   - Session cookie is cleared
   - User is redirected to `/sign-in`

### Protected Routes

The middleware in `/apps/dashboard/src/middleware.ts` protects all routes except:
- `/sign-in` - Public sign-in page
- `/api/auth/*` - Better Auth API routes
- Static assets and Next.js internals

### Server-side Auth Utilities

```typescript
import { getSession, requireAuth, isAuthenticated } from '../lib/auth'

// Get current session (returns null if not authenticated)
const session = await getSession()

// Require authentication (redirects to /sign-in if not authenticated)
const session = await requireAuth()

// Check if authenticated (returns boolean)
const authenticated = await isAuthenticated()
```

## Next Steps

After completing the manual database setup step:

1. Test the complete authentication flow
2. Consider adding:
   - Password authentication (optional)
   - OAuth providers (Google, GitHub, etc.)
   - Two-factor authentication
   - Password reset flow
   - Email verification for new accounts
   - User profile management
   - Session management UI (view/revoke active sessions)

## Troubleshooting

### OTP emails not sending
- Verify `RESEND_API_KEY` is correct
- Check `RESEND_FROM_EMAIL` is a verified domain in Resend
- Check Resend dashboard for error logs

### Database connection errors
- Verify `DATABASE_URL` is correct
- Ensure your Neon database is running
- Check database credentials and network access

### Session not persisting
- Ensure cookies are enabled in your browser
- Check that `NEXT_PUBLIC_APP_URL` matches your app URL
- Verify middleware is correctly configured

### Middleware redirect loops
- Check that `/api/auth/*` is excluded from middleware
- Verify sign-in page path is `/sign-in`
- Clear browser cookies and try again
