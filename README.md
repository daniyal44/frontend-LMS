# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Environment variables

The frontend uses `VITE_API_BASE` to determine the backend URL. If `VITE_API_BASE` is not provided, the app falls back to `http://localhost:4000` by default.

Create a `.env` file in the project root (not committed) or copy the example:

```env
# Frontend API base URL (change if your backend runs on a different host/port)
VITE_API_BASE=http://localhost:4000
```

When running locally with Vite, the environment variable must start with `VITE_` to be exposed to client code. Example run commands are:

```bash
# install deps
npm install

# dev server (will read .env)
npm run dev
```
