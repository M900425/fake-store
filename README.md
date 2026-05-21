# Fake Store E-Commerce Project

A comprehensive, modern e-commerce web application built with React, Vite, and TypeScript. The project provides a realistic shopping experience by integrating the Fake Store API, the Exchange Rate API, and a custom mock-payment system.

## 🔗 Live Demo

[View Live Demo](https://fake-store-five-gold.vercel.app/)

---

## 🚀 Key Features

- **Product Catalog:** Dynamic browsing with category filtering, real-time search, and sorting.
- **Global Currency Support:** Real-time price conversion across multiple currencies powered by the Exchange Rate API.
- **Shopping Cart:** Persistent cart management with quantity updates, item removal, and full-cart clearance with confirmation modals.
- **User Authentication:** Simulated secure login system that protects the checkout flow.
- **Checkout Flow:** Functional mock-payment simulation using user profile data.
- **Internationalization (i18n):** Extensive localization supporting 26 languages using i18next for a global user experience.
- **UX Enhancements:** Sticky footer actions in filters, clickable navigation between Cart and Product Details, and global notification feedback powered by Ant Design.

---

## 🛠️ Tech Stack

- **Core:** React 18, Vite, TypeScript
- **State Management:** Redux Toolkit
- **Data Fetching:** RTK Query (Fake Store API & Exchange Rate API integration)
- **Styling:** SCSS, Ant Design
- **Routing:** React Router DOM (v6+)
- **Localization:** i18next & react-i18next

---

## 📁 Project Structure

```plaintext
src/
├── api/           # RTK Query definitions (Product & Exchange APIs)
├── assets/        # Global styles and static assets
├── components/    # Generic UI components (Buttons, Spinners, Modals)
├── constants/     # Configs (Mock profile, Currency symbols)
├── hooks/         # Custom React hooks (useLocalStorage, etc.)
├── layouts/       # Main layout shells & Navigation components
├── locales/       # i18n JSON translation files
├── pages/         # View layers (Catalog, Cart, Checkout, Login, Profile)
├── store/         # Redux store (Cart, Auth slices)
└── types/         # TypeScript interfaces
```

---

## ⚙️ Development Guidelines

- **Absolute Imports:** Use the `@/` alias (e.g. `@/components/Button`) for cleaner imports.
- **Strict Typing:** All API responses and component props must be explicitly typed.
- **Localization:** All hardcoded text must be extracted into `locales/*.json` files and accessed via `t('key')`.

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
