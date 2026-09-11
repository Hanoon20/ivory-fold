import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          scroll: ['gsap', '@studio-freight/lenis'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
