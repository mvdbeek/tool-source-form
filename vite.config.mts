import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

// Get the repo name from package.json homepage
const repoName = process.env.npm_package_homepage?.match(/\/([^/]+)$/)?.[1] ?? 'jsonforms-react-seed';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['src/**'],
      exclude: ['src/main.tsx'],
    },
  },
});
