// vite.config.js
import React from "@vitejs/plugin-react";
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [React()],
  base: '/maskinovervakning-frontend/'
});