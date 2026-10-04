# AK Flips 🚗

Montreal's used-car flipper — hand-picked, fully inspected & reconditioned used cars, priced fairly and sold fast.

## 🌟 Features
- **Flipper-first UX**: Dark design with crimson accents matching the AK Flips brand.
- **Curated Inventory**: 5 hand-picked used cars with real photos, filters and search.
- **How It Works**: We hunt → we recondition → you drive.
- **Sell Us Your Car**: We buy clean used cars directly.
- **Lead capture**: All forms (contact, car inquiry, sell-your-car) post via FormSubmit AJAX to the owner's inbox — no CRM needed.
- **Bilingual**: Full EN/FR toggle.
- **Animated Interface**: Smooth scroll reveals and page transitions using `motion/react`.
- **Responsive Design**: Optimized for all devices.

## 🛠️ Stack
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: motion/react (framer-motion)
- **Forms**: FormSubmit AJAX (https://formsubmit.co/ajax/...)

## 🚀 Getting Started
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`

## 📝 Notes
- Car inventory lives in `src/data/cars.ts` — photos in `public/cars/`.
- Site contact info (email, phone, Instagram) is centralized in the `SITE` constant in `src/App.tsx`.
- First FormSubmit submission triggers an activation email to EACH inbox (client + Mohamed) — both must be clicked before leads arrive.

## 📄 License
MIT
