import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/' because the site is served from the apex custom domain (bookdt.app),
// i.e. the site root — not a GitHub project subpath. Do NOT change to '/repo/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
