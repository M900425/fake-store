# Fake Store E-Commerce Project

A modern e-commerce web application built with **React**, **Vite**, and **TypeScript**, leveraging the public [Fake Store API](https://fakestoreapi.com).

[🔗 Live Demo ](https://fake-store-five-gold.vercel.app/catalog)

## 🚀 Tech Stack

- **Framework / Bundler:** React 18 + Vite
- **Language:** TypeScript (Strict Typing)
- **Styling:** SCSS (Sass) + [Ant Design](https://ant.design/) (Component Library)
- **Routing:** React Router DOM
- **Internationalization (i18n):** i18next + react-i18next (Supporting 4 languages: EN, UA, FR, PL)
- **Linter:** ESLint (Flat Config)

## 📁 Project Structure

The project follows a modular, layered architecture designed for scalability and maintainability:

- `src/api/` — API client and request configurations for the Fake Store API.
- `src/components/` — Shared, generic UI components (Buttons, Inputs, Modals, etc.).
- `src/entities/` — Business domain-specific components and logic (e.g., Product cards).
- `src/helpers/` — Pure utility and helper functions.
- `src/hooks/` — Custom React hooks.
- `src/layouts/` — Page wraps and layout shells (Header, Footer, etc.).
- `src/locales/` — Localization files (JSON dictionaries) and i18n configurations.
- `src/pages/` — Main application views and pages (Home, Cart, ProductDetails, etc.).
- `src/types/` — Global TypeScript interfaces and type definitions.

## 🛠️ Development Guidelines

- **Absolute Imports:** To maintain a clean codebase, the `@/` path alias is configured. Always use `@/components` instead of deep relative paths like `../../components`.
- **Strict Typing:** The use of the implicit or explicit `any` type is strictly forbidden by ESLint configuration. All data fetched from the API or passed through components must be properly typed. If using `any` is temporarily unavoidable, a code comment must be provided specifying where to look for the correct typing structure.

## ⚙️ Getting Started

### 1. Install dependencies

Run the following command in the project root directory:

```bash
npm install
```
