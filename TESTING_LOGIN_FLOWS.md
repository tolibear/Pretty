# Testing Login Flows - Pretty.af

## Overview

The Pretty.af app now has a comprehensive authentication testing system that allows you to test different login flows and user states without needing a backend.

## Quick Start

1. **Start the development server**:
   ```bash
   pnpm dev
   ```

2. **Look for the Auth Testing Panel** in the bottom-right corner of the page (only visible in development mode)

3. **Test different authentication states** by clicking the buttons in the testing panel

## Authentication Testing Panel

The testing panel appears as a small widget in the bottom-right corner with these options:

- 🚪 **Logged Out** - Test the unauthenticated experience
- 👤 **Regular User** - Test logged-in user with 3 generations left
- ✨ **New User** - Test new user experience with 5 generations left  
- 🎨 **Creator** - Test creator experience with verified status

## Testing Scenarios

### 1. Logged Out Experience
**How to test**: Click "🚪 Logged Out" in the testing panel

**What to verify**:
- Header shows "Sign in" and "Sign up" buttons
- No generation counter visible
- No user menu or notifications
- Clicking "Sign in" takes you to `/login`
- Clicking "Sign up" takes you to `/sign-up`

### 2. Login Flow Testing

#### X (Twitter) OAuth Login
**How to test**:
1. Set auth state to "Logged Out"
2. Navigate to `/login`
3. Click the large blue "Continue with X" button
4. Wait for the simulated OAuth flow (1.5 seconds)
5. Should redirect to `/dashboard` and show success toast

#### Google OAuth Login  
**How to test**:
1. Set auth state to "Logged Out"
2. Navigate to `/login`
3. Click the "Continue with Google" button
4. Wait for the simulated OAuth flow (1.5 seconds)
5. Should redirect to `/dashboard` and show success toast

#### Email/Password Login
**How to test**:
1. Set auth state to "Logged Out"
2. Navigate to `/login`
3. Fill in any email and password (validation will work)
4. Click "Sign in with Email"
5. Wait for the simulated API call (1 second)
6. Should redirect to `/dashboard` and show success toast

### 3. Registration Flow Testing

#### Social Registration
**How to test**:
1. Set auth state to "Logged Out"
2. Navigate to `/sign-up`
3. Click either social login button
4. Should create account and redirect to `/dashboard`

#### Email Registration
**How to test**:
1. Set auth state to "Logged Out"
2. Navigate to `/sign-up`
3. Fill in name, email, and password (8+ characters)
4. Click "Create Account"
5. Should create account and redirect to `/dashboard`

### 4. Authenticated User Experience

#### Regular User (3 generations left)
**How to test**: Click "👤 Regular User" in testing panel

**What to verify**:
- Generation counter shows "3 generations left"
- User menu appears with avatar
- Bell icon for notifications
- User menu contains: Dashboard, Settings, Sign out
- Mobile menu shows generation counter

#### New User (5 generations left)
**How to test**: Click "✨ New User" in testing panel

**What to verify**:
- Generation counter shows "5 generations left"
- Same UI as regular user but with more generations

#### Creator User
**How to test**: Click "🎨 Creator" in testing panel

**What to verify**:
- Generation counter shows "0 generations left"
- User menu includes "Create Style" option
- User has verified badge/status
- Creator-specific features visible

### 5. Logout Testing
**How to test**:
1. Set any authenticated state
2. Click user menu in header
3. Click "Sign out"
4. Should return to logged-out state
5. Or use mobile menu "Sign out" button

## UI Priority Testing

Verify the authentication UI follows the correct hierarchy:

### Login/Signup Pages
1. **PRIMARY**: X (Twitter) button - large, blue, prominent
2. **SECONDARY**: Google button - medium, outlined
3. **FALLBACK**: Email form - smaller, less prominent

### Button Styling Verification
- X button: Large (`h-12`), blue background (`bg-[#1da1f2]`)
- Google button: Medium (`h-10`), outlined variant
- Email form: Appears below divider, less visual weight

## Mobile Testing

Test responsive behavior:

1. **Resize browser** to mobile width (< 768px)
2. **Verify mobile menu** works with hamburger icon
3. **Check touch targets** are at least 44px high
4. **Test mobile auth forms** have proper input heights (`h-11`)

## Error State Testing

### Invalid Login
**How to test**:
1. The mock system always succeeds, but you can test form validation
2. Try submitting empty forms
3. Try invalid email formats
4. Try passwords under 8 characters (for registration)

### Loading States
**How to test**:
1. Click any auth button and observe loading spinners
2. Verify buttons are disabled during loading
3. Check loading text changes appropriately

## Persistence Testing

The auth state persists in localStorage:

1. **Login with any method**
2. **Refresh the page** - should stay logged in
3. **Open new tab** - should stay logged in
4. **Logout** - should clear from all tabs

## Development Tools

### Browser DevTools
- Check **localStorage** for `pretty-af-auth-state` and `pretty-af-user`
- Monitor **Network tab** for any unexpected requests
- Use **Console** to check for errors

### Testing Panel Features
- **Instant state switching** - no page refresh needed
- **Persistent across navigation** - panel stays visible
- **Development only** - won't appear in production

### Browser Console Testing
You can also test the auth system directly in the browser console:

```javascript
// Test auth context functionality
testAuth.test()

// Clear auth state
testAuth.clear()

// Set specific user types
testAuth.setUser('logged-out')
testAuth.setUser('logged-in')
testAuth.setUser('new-user')
testAuth.setUser('creator')
```

## Troubleshooting

### Site Not Loading / Build Errors
**Fixed**: The useSearchParams issue has been resolved with Suspense boundaries.

If you encounter build errors:
1. Run `pnpm build` to check for compilation errors
2. Check the terminal output for specific error messages
3. Ensure all components are properly imported

### Testing Panel Not Visible
- Ensure you're in development mode (`NODE_ENV=development`)
- Check browser console for errors
- Try refreshing the page
- Verify the AuthTestingPanel is imported in your page

### Auth State Not Persisting
- Check if localStorage is enabled in your browser
- Clear localStorage and try again: `localStorage.clear()`
- Use browser console: `testAuth.clear()` then refresh

### Forms Not Working
- Check browser console for validation errors
- Ensure all required fields are filled
- Verify network requests in DevTools
- Try using the console commands to set auth state directly

### Components Not Rendering
- Check that AuthProvider is wrapping your app in `app/layout.tsx`
- Verify all auth components are using the `useAuth()` hook correctly
- Check for TypeScript errors in the terminal

### Navigation Issues
- Ensure all route components exist
- Check that the router is working properly
- Verify that redirects after login/signup are working

## Common Issues & Solutions

### Testing Panel Not Visible
- Ensure you're in development mode (`NODE_ENV=development`)
- Check browser console for errors
- Try refreshing the page

### Auth State Not Persisting
- Check if localStorage is enabled in your browser
- Clear localStorage and try again: `localStorage.clear()`

### Forms Not Working
- Check browser console for validation errors
- Ensure all required fields are filled
- Verify network requests in DevTools

## Integration with Backend

When the backend is ready:

1. **Replace mock functions** in `lib/auth-context.tsx`
2. **Update API endpoints** to real URLs
3. **Handle real OAuth callbacks**
4. **Remove testing panel** for production

The frontend is designed to work with these expected backend endpoints:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/oauth/twitter`
- `POST /api/auth/oauth/google`
- `POST /api/auth/logout`

## Next Steps

1. **Test all scenarios** listed above
2. **Report any UI/UX issues** you find
3. **Verify mobile responsiveness** on real devices
4. **Check accessibility** with screen readers
5. **Test with different browsers** (Chrome, Firefox, Safari)

The authentication system is now fully testable and ready for backend integration! 