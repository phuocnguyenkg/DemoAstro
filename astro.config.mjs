// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // server: {
  //   host: '192.168.1.6',
  //   port: 3001 // Port (Mặc định là 4321)
  // },
  integrations: [react({ experimentalReactChildren: true })],
  output: 'server',
  devToolbar: {
    enabled: false
  },
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
