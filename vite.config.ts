import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
      core: '/src/core',
      shared: '/src/shared',
      components: '/src/components',
    },
  },
  base: "/TaskCalendar/",
  plugins: [react()],
});
