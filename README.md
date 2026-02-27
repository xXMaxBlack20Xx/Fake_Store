# 📦 Fake Store App

React Native (Expo) application using the FakeStore API with authentication, Drawer + Tabs navigation, and secure JWT token storage.

---

## 🚀 Tech Stack

- Expo SDK 54
- React Native 0.81
- React Navigation (Stack, Drawer, Bottom Tabs)
- Expo Secure Store (JWT persistence)
- TypeScript

---

## 🛠️ Prerequisites

Make sure you have installed:

- Node.js (>= 18 recommended)
- npm or yarn
- Expo CLI (optional)

Install Expo CLI globally (optional):

\`\`\`bash
npm install -g expo-cli
\`\`\`

---

## 📥 1. Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd fake-store
\`\`\`

## 📦 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

or

\`\`\`bash
yarn
\`\`\`

## ▶️ 3. Start the Development Server

\`\`\`bash
npm start
\`\`\`

or

\`\`\`bash
expo start
\`\`\`

---

## 📱 Run on Device / Emulator

**Android**
\`\`\`bash
npm run android
\`\`\`

**iOS** *(Mac only)*
\`\`\`bash
npm run ios
\`\`\`

**Web**
\`\`\`bash
npm run web
\`\`\`

You can also:

- Scan the QR code using the **Expo Go** app (Android/iOS)
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Press `w` for web

---

## 🔐 Authentication

This project uses the FakeStore API:

\`\`\`
https://fakestoreapi.com/auth/login
\`\`\`

**Test Credentials**

| Field    | Value    |
|----------|----------|
| username | mor_2314 |
| password | 83r5^_   |

> JWT tokens are securely stored using `expo-secure-store`.

---

## 🧠 Project Structure

\`\`\`
src/
 ├── api/          → API layer (auth, HTTP client, token store)
 ├── auth/         → AuthContext (global authentication state)
 ├── navigation/   → Drawer, Tabs, Stack navigators
 └── screens/      → Application screens
\`\`\`

---

## 🧹 Clear Cache (If Needed)

If Metro bundler behaves unexpectedly:

\`\`\`bash
expo start -c
\`\`\`

---

## 🛠️ Troubleshooting

**Reinstall dependencies**
\`\`\`bash
rm -rf node_modules
npm install
\`\`\`

**Reset Expo cache**
\`\`\`bash
expo start -c
\`\`\`

---

## 🚀 Production Build (Optional)

**Using Expo:**
\`\`\`bash
npx expo build
\`\`\`

**Using EAS:**
\`\`\`bash
eas build
\`\`\`