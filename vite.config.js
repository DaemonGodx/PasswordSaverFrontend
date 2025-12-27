import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables

const BASE_URL = process.env.VITE_BASE_URL;



export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: "https://passwordsaverbackend-mzpb.onrender.com",
        changeOrigin: true,   // 🔑 REQUIRED
        secure: false        // 🔑 REQUIRED for http
      }
    }
  }
})
