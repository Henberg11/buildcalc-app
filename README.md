# BuildCalc — Trade & DIY Calculators

A complete Expo (React Native) app: 10 construction/DIY calculators, offline, with AdMob banner ads wired in.
Everything here is finished code — what's left is account setup and a cloud build, both free.

## What's in this folder

- `App.js`, `src/` — full app source (already written, no placeholders in the logic)
- `app.json`, `eas.json`, `babel.config.js`, `package.json` — Expo/build config
- `assets/icon.png`, `assets/adaptive-icon.png`, `assets/splash.png` — generated app icons
- `STORE_LISTING.md` — title, description, keywords ready to paste into Play Console
- `privacy-policy.html` — required for any app showing ads; needs to be hosted at a public URL

## Before you build: two IDs you must swap in

1. **AdMob App ID** (`app.json`, under `plugins`) — currently set to Google's public *test* ID so the app works immediately. Replace with your real AdMob App ID once you create an AdMob account (free, linked to your Play Console).
2. **AdMob Banner Unit ID** (`src/AdBanner.js`, `PRODUCTION_BANNER_ID`) — same idea, and flip `useTestAds` to `false` once both real IDs are in. Shipping with test ads is against AdMob policy, so this step isn't optional before you go live.

## Build it — no Android Studio needed

This uses Expo's free cloud build service (EAS Build). Run these from a terminal on your own machine (or I can drive this through Claude in Chrome / walk you through it):

```bash
npm install -g eas-cli
cd BuildCalcApp
npm install
eas login          # free Expo account — sign up if you don't have one
eas build:configure
eas build --platform android --profile production
```

That last command compiles and signs the app in Expo's cloud and gives you a downloadable `.aab` file — no local Android SDK required.

## Publish to Google Play

1. Create a Play Console developer account: $25 one-time fee, requires government ID + a Google payments profile (this step is yours — I won't handle payment or identity info).
2. Host `privacy-policy.html` somewhere public (GitHub Pages, Netlify, or any free static host) and copy the URL — Play Console requires this since the app shows ads.
3. Create a new app in Play Console, fill in the listing using `STORE_LISTING.md`, upload the icon/screenshots.
4. Upload the `.aab` from the EAS build step.
5. Run the closed test: Google requires 12 opted-in testers for 14 continuous days before a new personal account can publish to production. Add testers by email in Play Console's testing track.
6. After the 14 days, apply for production access and submit for review.

## Local preview while developing

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app on your phone to preview instantly (ads will show as Google's test banner until you swap in real IDs).
