# Login Dashboard App

A Next.js application with login functionality and dashboard access, implementing the requirements from the Figma design and API integration.

## Features

- User authentication with email and password
- Login form with real-time validation
- Dashboard page with user information
- Secure logout functionality with confirmation
- Responsive design that works on all device sizes
- Authentication state persistence using localStorage
- Protected routes that require authentication

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Zustand for state management
- Tailwind CSS for styling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  ├── page.tsx          # Login page
  ├── layout.tsx        # Root layout
  ├── globals.css       # Global styles
  └── dashboard/
      └── page.tsx      # Dashboard page

components/
  ├── LoginForm.tsx     # Login form component with validation
  ├── Dashboard.tsx     # Dashboard component with user info and logout
  ├── AuthLayout.tsx    # Authentication layout component

services/
  └── authServices.ts   # Authentication API services

store/
  └── authStore.ts      # Zustand store for authentication state
```

## Authentication Flow

1. User opens the app at http://localhost:3000
2. Authentication state is checked on app load
3. If valid authentication token exists, user is redirected to dashboard
4. User enters email and password in the login form
5. Form validates:
   - Email format (must be valid email address)
   - Password (required field)
   - Login button is disabled until both fields are valid
6. On successful validation, credentials are sent to the authentication API
7. If authentication is successful:
   - Token is stored in localStorage for persistence
   - User information is fetched from the user info API
   - User is redirected to the dashboard
8. Dashboard displays user information and provides logout button
9. On logout:
   - User is shown a confirmation modal
   - Token is removed from localStorage
   - User is redirected to login page

## API Integration

The app integrates with the following APIs:

- Authentication: `https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token`
- User Info: `https://api-yeshtery.dev.meetusvr.com/v1/user/info`

Test credentials:
- Email: dev.aert@gmail.com
- Password: helloworld

## Implementation Details

### Login Form Validation

The login form implements the following validation rules:
- Email field must not be empty
- Email must be in valid format (xxx@yyy.zzz)
- Password field must not be empty
- Login button is disabled until both fields are valid
- Validation errors are cleared as soon as the user starts typing in the invalid field

### Authentication State Management

Authentication state is managed using Zustand:
- Token is stored in localStorage for persistence
- Authentication status is checked on app load
- Protected routes redirect unauthenticated users to login page
- Authenticated users are redirected from login page to dashboard

### Responsive Design

The application features a responsive design that works well on:
- Mobile devices
- Tablets
- Desktop computers

The login form and dashboard layout adapt to different screen sizes using Tailwind CSS responsive utilities.

## Environment

This project requires Node.js and npm to run.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.