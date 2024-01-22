import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 8888
    },
    define:{
      'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL)
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    }
  }
})
