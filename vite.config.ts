import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// VITE_BASE_PATH controls the URL prefix the site is served from.
// - For a project page (e.g. username.github.io/afterhourscamp/), set VITE_BASE_PATH=/afterhourscamp/
// - For a custom domain or root user/org page, leave it unset (defaults to '/').
// The CI workflow at .github/workflows/deploy.yml is the canonical place to set it.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
});
