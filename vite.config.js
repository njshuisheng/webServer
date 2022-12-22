import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/xkgw': {
        target: 'https://xkcs.jssecco.com',
        // target: 'http://xkqd.jssecco.com',
        secure: false,
        changeOrigin: true,
      }
    }
  }
})
