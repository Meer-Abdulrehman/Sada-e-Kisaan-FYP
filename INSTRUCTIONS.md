# MASTER PROJECT SPECIFICATION & AI AGENT INSTRUCTIONS
**Project Title:** AgriVoice 360 (Multimodal Voice-Powered Crop Diagnostics & Agro-Commerce Mobile App)  
**Academic Context:** BS Software Engineering (BSSE) Final Year Project (FYP)  
**Role:** Senior Full-Stack Mobile Architect & AI Systems Engineer  

---

## 1. PROJECT OVERVIEW & CORE VISION
**AgriVoice 360** is a bilingual (Urdu + English), cloud-connected mobile ecosystem designed to empower smallholder farmers in Pakistan. It solves delayed crop disease diagnosis, illiteracy barriers with text-heavy interfaces, and counterfeit agro-inputs by combining:
1. **Cloud Computer Vision Diagnostics:** Farmers capture leaf images via mobile camera; cloud AI models detect diseases and return confidence scores + severity levels.
2. **Bilingual Voice Triage (Urdu + English):** Farmers speak naturally in Urdu to describe symptoms or ask questions; cloud Speech-to-Text (Whisper) + NLP Intent Parsing understands the query and responds with actionable advice via Urdu Text-to-Speech (`ur-PK`).
3. **Verified Agro-Commerce & Advisory:** Direct in-app triage linking farmers to certified Agronomists for prescription validation and verified Agro-Vendors for genuine pesticides/fertilizers.

---

## 2. CRITICAL ARCHITECTURAL CONSTRAINTS (NON-NEGOTIABLE)
1. **MOBILE-ONLY APPLICATION (NO WEB FRONTEND):**
   - The entire user interface lives inside a single **React Native** cross-platform mobile app.
   - **NEVER** generate React web apps, Next.js, HTML/CSS websites, or browser-based admin dashboards.
   - All three user roles (**Farmer**, **Agronomist**, **Agro-Vendor**) log into the **same mobile app** and see role-specific screens via Role-Based Access Control (RBAC).

2. **100% ONLINE CLOUD ARCHITECTURE (NO OFFLINE MODE):**
   - **NEVER** implement local SQLite databases, WatermelonDB, AsyncStorage data caching for offline mode, NetInfo background sync workers, or on-device TFLite edge inference.
   - Every feature (leaf scanning, voice transcription, disease history, consultations, orders) communicates directly with the cloud backend APIs in real time over HTTPS and WebSockets.
   - Always implement clean loading states, network error handling, and retry mechanisms in the UI.

3. **STRICT MONOREPO SEPARATION:**
   - Keep `frontend/`, `backend/`, and `ai-services/` completely decoupled.

---

## 3. UI/UX DESIGN SYSTEM (PALETTE & ACCESSIBILITY)
- **Canvas / Background:** Warm Ivory Sand (`#FAF6F0`)
- **Surface Cards / Containers:** Soft Earth Linen (`#EAE0D5`)
- **Primary Brand & Headers:** Deep Forest Green (`#1B4332`)
- **Secondary Accent & Action Buttons:** Rich Cognac (`#8D4925`)
- **Primary Text:** Charcoal Slate (`#2B2D42`)
- **Semantic Status Colors:**
  - Healthy / Verified: `#2D6A4F`
  - Warning / Medium Severity: `#D97706`
  - Critical Disease / Error: `#C85A32`
- **Accessibility:**
  - Minimum touch target size: 48x48dp.
  - Bilingual Urdu (`اردو`) + English labels and icons.
  - Native Urdu Text-to-Speech (`ur-PK`) audio replay on every diagnostic & prescription card.
