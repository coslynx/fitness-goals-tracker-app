import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Fitness Tracker',
        short_name: 'FitTrack',
        description: 'A comprehensive fitness goal tracking application.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      emitFile: true,
      filename: 'bundle-analysis.html',
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    target: 'esnext',
    assetsDir: 'assets',
    sourcemap: true,
  },
  resolve: {
    alias: {
      src: '/src',
      '@': '/src',
    },
  },
});