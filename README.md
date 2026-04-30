# Idli Junction

Fullstack restaurant website for Idli Junction, Nagpur. The public site shows a live Firebase-backed menu, WhatsApp ordering, gallery, contact form, Google Maps embed, and restaurant details. The admin console manages menu items, availability, featured dishes, image uploads, and customer messages.

## Tech Stack

- React 18, Vite, Tailwind CSS
- Firebase Auth, Firestore, Storage
- Vercel or Firebase Hosting deployment

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` from `.env.example` and fill in Firebase web app values:

   ```bash
   cp .env.example .env
   ```

3. Start development:

   ```bash
   npm run dev
   ```

4. Open `/admin/login` and sign in with a Firebase Auth user.

The app falls back to bundled demo menu data if Firebase is not configured, so the public site still renders locally.

## Firebase Setup

1. Enable Email/Password sign-in in Firebase Auth.
2. Create at least one admin user in Firebase Auth.
3. Deploy Firestore and Storage rules:

   ```bash
   firebase deploy --only firestore:rules,storage
   ```

4. Seed the initial menu when credentials are configured:

   ```bash
   npm run seed:menu
   ```

## Deployment

### Vercel

Set the `VITE_FIREBASE_*` environment variables in Vercel, then deploy:

```bash
npm run build
npm run deploy:vercel
```

`vercel.json` is configured for SPA routing.

### Firebase Hosting

Set local Firebase environment variables, then run:

```bash
npm run build
npm run deploy:firebase
```

`firebase.json` serves the Vite `dist` folder and rewrites routes to `index.html`.

## Main Collections

- `menu_items`: public reads; authenticated admin writes.
- `contact_messages`: public creates; authenticated admin reads and updates.

## Useful Scripts

- `npm run dev` - start Vite locally.
- `npm run build` - production build.
- `npm run preview` - preview the production build.
- `npm run seed:menu` - reset and seed Firestore menu data.
