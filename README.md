<div align="center">

<img src="frontend/shared/assets/logo.png" alt="Sada-e-Kisan Logo" width="120" style="border-radius: 24px;" />

# Sada-e-Kisan (صدائے کسان)
### *Multimodal Urdu Voice-Powered Crop Diagnostics & Verified Agro-Commerce Mobile Ecosystem*

**BS Software Engineering (BSSE) Final Year Project (FYP)**

[![React Native](https://img.shields.io/badge/React_Native-0.88.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo_SDK-58.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS_%2B_Prisma-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![FastAPI](https://img.shields.io/badge/AI_Service-FastAPI_%2B_PyTorch-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

</div>

---

## 🌾 Overview & Core Vision

**Sada-e-Kisan (صدائے کسان)** — *"Voice of the Farmer"* — is a bilingual (**Urdu + English**), 100% cloud-connected mobile ecosystem designed to empower smallholder farmers in Pakistan. It bridges literacy barriers, delayed crop disease detection, and counterfeit agro-input risks inside **one unified role-based mobile application**:

1. **🔬 Cloud Computer Vision Diagnostics:** Farmers capture crop leaf photos; cloud AI models detect diseases, severity levels, and confidence scores. Low-confidence scans (`< 80%`) automatically escalate to certified agronomists.
2. **🎙️ Bilingual Urdu Voice Triage (`ur-PK`):** Farmers speak naturally in Urdu to describe symptoms; cloud Whisper STT + NLP intent parsing generates actionable advice read aloud via native Urdu Text-to-Speech.
3. **🩺 Agronomist Triage & Certified Prescriptions:** Plant doctors review flagged scans, manage farmer consultation bookings, and issue verified digital prescriptions with Urdu audio instructions.
4. **🏪 Verified Agro-Commerce:** Registered agro-vendors manage genuine pesticide/fertilizer inventory and fulfill farmer orders via real-time updates and ACID transactions.

---

## 🏗️ System Architecture & Feature-Driven Structure

This repository follows a **strictly decoupled monorepo** with **Feature-Driven (Role-Isolated)** organization on the mobile client:

```text
FYP/
├── INSTRUCTIONS.md              # Master project specification & constraints
├── README.md                    # Project documentation & setup guide
├── .gitignore                   # Monorepo ignore rules (node_modules, .env, venv, weights)
│
├── frontend/                    # 📱 Single Unified React Native Mobile App (Expo SDK 58 + TS)
│   ├── App.tsx                  # App entry point
│   ├── app.json                 # Expo configuration & hardware permissions
│   ├── package.json             # Mobile dependencies
│   ├── farmers/                 # 🌾 Farmer Role (screens/, components/, api/)
│   ├── doctors/                 # 🔬 Agronomist / Doctor Role (screens/, components/, api/)
│   ├── vendors/                 # 🏪 Agro-Vendor Role (screens/, components/, api/)
│   └── shared/                  # 🤝 Cross-Role Modules
│       ├── splash/              # Animated pencil-sketch-to-color SplashScreen
│       ├── auth/                # Login, Register & Role Selection (RBAC)
│       ├── navigation/          # Role-based navigators
│       ├── components/          # Reusable accessible UI primitives
│       ├── theme/               # Sunlight-readable design tokens
│       ├── utils/               # Bilingual & Urdu TTS utilities
│       └── assets/              # App branding & finalized logo.png
│
├── backend/                     # ⚙️ Cloud API Server (NestJS + PostgreSQL + Prisma + Socket.io)
└── ai-services/                 # 🧠 Python AI Microservice (FastAPI + OpenCV + Whisper)
```

---

## 🎨 UI/UX Design System (Sunlight-Readable)

Engineered specifically for outdoor field usage in bright sunlight and low-literacy accessibility:

| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas / Background** | Warm Ivory Sand | `#FAF6F0` | Primary glare-free screen background |
| **Surface Cards** | Soft Earth Linen | `#EAE0D5` | Diagnostic, voice & order cards |
| **Primary Brand** | Deep Forest Green | `#1B4332` | Headers, trust indicators & brand identity |
| **Action Accent** | Rich Cognac | `#8D4925` | High-contrast CTAs, mic & scan buttons |
| **Primary Text** | Charcoal Slate | `#2B2D42` | High-legibility bilingual text |
| **Healthy / Verified** | Leaf Emerald | `#2D6A4F` | Healthy crops & doctor-verified badges |
| **Warning / Review** | Harvest Amber | `#D97706` | Moderate severity / agronomist review |
| **Critical / Alert** | Terracotta Rust | `#C85A32` | Severe disease & urgent alerts |

* **Accessibility Standards:** Minimum `48×48dp` touch targets, paired icons + bilingual Urdu/English labels, and audio replay support (`ur-PK`).

---

## 🛠️ Tech Stack

* **Mobile App (`frontend/`):** React Native `0.88.1`, Expo SDK `58`, TypeScript (`strict: true`), React Navigation `v7`, Zustand, Axios, Socket.io Client, `expo-camera`, `expo-audio`, `expo-speech`, `react-native-svg`, `lucide-react-native`
* **Cloud Backend (`backend/`):** Node.js, NestJS, TypeScript, PostgreSQL, Prisma ORM, Socket.io *(Planned)*
* **AI Microservice (`ai-services/`):** Python, FastAPI, PyTorch / YOLOv8 / MobileNetV3, OpenCV, OpenAI Whisper *(Planned)*

---

## 🚀 Getting Started (Mobile App)

### Prerequisites
* **Node.js** `v20+` (verified on `v22.16.0`)
* **Expo Go** installed on your physical Android or iOS device

### Run on Mobile Device
```bash
# 1. Navigate to the mobile app
cd frontend

# 2. Install dependencies
npm install

# 3. Start Expo Metro Bundler
npx expo start
```
Scan the terminal QR code using **Expo Go** (Android) or the **Camera app** (iOS) on the same Wi-Fi network.
> *Tip: If your local Wi-Fi blocks LAN connections, run `npx expo start --tunnel ngrok`.*

### TypeScript Verification
```bash
cd frontend
npx tsc --noEmit
```

---

## 🌿 Git Branching Workflow

This project uses a clean **Git Flow** workflow:
* **`main`** — Production / evaluation-ready stable releases only.
* **`develop`** — Active feature development and integration.

```bash
# Always develop on the develop branch
git checkout develop
git add .
git commit -m "feat: describe your change"
git push origin develop
```

---

## 📌 Project Status

- [x] Monorepo & Feature-Driven role folder architecture (`farmers/`, `doctors/`, `vendors/`, `shared/`)
- [x] Brand identity, custom logo, sunlight-readable theme tokens & Expo SDK 58 setup
- [x] Animated pencil-sketch-to-color-fill Splash Screen (`Sada-e-Kisan / صدائے کسان`)
- [ ] Authentication & Role-Based Navigation (`shared/auth/` & `shared/navigation/`)
- [ ] Farmer, Doctor & Vendor mobile modules
- [ ] NestJS Cloud Backend & PostgreSQL Prisma schema
- [ ] FastAPI Computer Vision & Urdu Whisper AI microservice
