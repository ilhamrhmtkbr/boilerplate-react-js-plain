# 🚀 React Boilerplate

Boilerplate **React + Vite** yang scalable dan reusable untuk mempercepat development aplikasi web seperti **dashboard, admin panel, atau sistem berbasis CRUD**.

Dibangun dengan arsitektur modular berbasis fitur (**feature-based architecture**) serta reusable component, custom hooks, layout, dan utility yang siap digunakan.

---

## ✨ Features

- ⚡ React + Vite
- 🎨 Tailwind CSS v4
- 📁 Feature-Based Architecture
- 🔐 Authentication (Login, Register, Forgot Password)
- 🪝 Custom Hooks
- 📦 Reusable Components
- 📊 Chart Components
- 📄 Table, Pagination & Filter
- 🧭 React Router DOM
- 🖼️ Image Cropper
- 🔔 Toast & Confirm Dialog
- ✅ Form Validation (React Hook Form + Yup)
- 🌐 API Ready (Axios)
- 📱 Responsive Layout
- 🌙 Easy to Customize

---

## 🛠️ Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- React Router DOM 7
- React Hook Form
- Yup Validation
- Axios
- Chart.js + React ChartJS 2
- Highlight.js
- ESLint

---

## 📦 Installation

Clone repository:

```bash
git clone https://github.com/ilhamrhmtkbr/boilerplate-react-js-plain.git
cd boilerplate-react-js-plain
```

Install dependencies:

```bash
npm install
```

---

## 🧑‍💻 Running Development Server

Start development server:

```bash
npm run dev
```

App will run at:

```txt
http://localhost:5173
```

---

## 🏗️ Production Build

Build project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint project:

```bash
npm run lint
```

---

## 📁 Project Structure

```txt
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── custom/
│   │   ├── layouts/
│   │   └── utils/
│   ├── config/
│   ├── features/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── product/
│   │   └── user/
│   ├── hooks/
│   ├── router/
│   ├── index.css
│   └── main.jsx
├── vite.config.js
└── package.json
```

---

## 🧱 Architecture

This project uses a **feature-based architecture**, where each feature is separated into its own module.

Example:

```txt
features/
├── auth/
├── dashboard/
├── product/
└── user/
```

Benefits:

- easier maintenance
- scalable structure
- reusable logic
- better feature separation

### Reusable Components

Reusable UI components are stored in:

```txt
src/components/common/
```

### Custom Hooks

Reusable logic is stored in:

```txt
src/hooks/
```

Example:

```txt
hooks/
├── useApi.js
├── useAuth.js
├── useConfirm.js
├── usePagination.js
└── useToast.js
```

---

## 🧩 Available Components

### UI Components

- Accordion
- Badge
- Breadcrumb
- Button
- Modal
- Pagination
- Table
- Tooltip
- Timeline
- Toggle
- Toast
- Stepper

### Form Components

- Form Field
- Form Float
- Form Fieldset
- Form Image Cropper

### Data Visualization

- Chart Line
- Chart Bar
- Chart Pie
- Chart Doughnut

### Utilities

- Loading Spinner
- Loading Pulse
- Loading Bar
- Export Docs
- Filter
- No Data

---

## 📜 Scripts

```bash
npm run dev       # run development server
npm run build     # build production
npm run preview   # preview production build
npm run lint      # run eslint
```

---

## 🤝 Contributing

Pull requests are welcome for improvements or additional features.

For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

MIT License © 2026