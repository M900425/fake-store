# 🛍️ Fake Store E-Commerce Platform

A comprehensive, production-ready e-commerce web application built with **React 19, Vite, and TypeScript**. This project serves as a showcase of modern frontend architecture, prioritizing performance, strict type safety, and seamless user experience.

## 🔗 Live Demo

[View Live Demo](https://fake-store-five-gold.vercel.app/)

---

## 🎯 The Objective & Architecture

The goal of this project was to implement a highly scalable e-commerce frontend that efficiently handles dynamic data, global localization, and complex state management.

**Key Architectural Decisions:**

- **Zero `any` Type Policy:** Strict TypeScript enforcement across the entire codebase. Every API response, component prop, and state slice is explicitly typed to ensure maximum reliability and prevent runtime errors.
- **Optimized Data Fetching:** Utilized **RTK Query** to handle caching, reduce redundant network requests, and manage loading/error states out-of-the-box.
- **State Persistence:** Implemented **Redux Persist** to ensure user cart data survives page reloads, a critical feature for e-commerce conversion rates.

---

## 🚀 Key Features

- **Dynamic Product Catalog:** Real-time browsing with category filtering and sorting.
- **Global Currency Support:** Live price conversion across multiple currencies powered by the Exchange Rate API.
- **Advanced Cart Management:** Persistent cart with quantity controls, item removal, and full-cart clearance (protected by confirmation modals).
- **Simulated Checkout Flow:** Functional mock-payment system utilizing protected routes and user profile data.
- **Extensive Internationalization (i18n):** Full localization support for 26 languages using `i18next`.
- **Responsive UI/UX:** Built with **Ant Design** components to ensure a flawless experience across desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Core:** React 19, Vite, TypeScript
- **State Management:** Redux Toolkit, Redux Persist
- **Data Fetching:** RTK Query (Integrated with Fake Store API & Exchange Rate API)
- **Styling:** SCSS, Ant Design (Adaptive layout)
- **Routing:** React Router v7
- **Localization:** i18next, react-i18next

---

## 📁 Project Structure

```plaintext
src/
├── api/           # RTK Query definitions (Product & Exchange APIs)
├── assets/        # Global styles and static assets
├── components/    # Generic UI components (Buttons, Spinners, Modals)
├── constants/     # Configs (Mock profile, Currency symbols, Languages)
├── hooks/         # Custom React hooks (e.g., useLocalStorage)
├── layouts/       # Main layout shells & Navigation components
├── locales/       # i18n JSON translation dictionaries
├── pages/         # View layers (Catalog, Cart, Checkout, Login, Profile)
├── store/         # Redux store configuration (Cart, Auth slices)
└── types/         # Strict TypeScript interfaces and types
```

---

## ⚙️ Development Guidelines

Absolute Imports: Use the @/ alias (e.g., @/components/Button) for cleaner and more maintainable imports.

Strict Typing (No any): The use of the undefined any type is strictly forbidden. If dynamic data is necessary, explicitly define where to find the typing or use unknown with proper type narrowing.

Localization Strategy: All hardcoded text must be extracted into locales/\*.json files and accessed via the t('key') hook.

---

## 📦 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Run in Development

Start the development server:

```bash
npm run dev
```

---

## 🌐 APIs & Libraries

- [Fake Store API](https://fakestoreapi.com/)
- [Exchange Rate API](https://www.exchangerate-api.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Ant Design](https://ant.design/)
- [i18next](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)

---
