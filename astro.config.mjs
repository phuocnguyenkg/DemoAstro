// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react({ experimentalReactChildren: true })],
  vite: {
    define: {
      'process.env': process
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  }
});
