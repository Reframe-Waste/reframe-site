import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // TODO: remove base when switching to custom domain (add public/CNAME with domain instead)
  base: '/reframe-site/',
});
