import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://VladGlivuk.github.io/",
  resolve: {
    alias: {
      src: '/src',
      core: '/src/core',
      shared: '/src/shared',
      components: '/src/components',
    },
  },
  plugins: [react()],
});
