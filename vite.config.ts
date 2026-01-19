
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file from directory where vite.config.ts is located.
  // We load all envs to ensure process.env.API_KEY is available as required.
  // Fix: Cast process as any to resolve "Property 'cwd' does not exist on type 'Process'" TypeScript error.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
    },
  };
});
