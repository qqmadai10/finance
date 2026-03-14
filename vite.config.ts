import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/finance/',
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
          chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        },
        external: ['fsevents', 'node:path', 'node:process', 'node:perf_hooks', 'node:fs/promises']
      }
    },
    define: {
      'process.env': {}, 
    },
  };
});