import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  define: {
    'global': 'window', // 이렇게 해서 빌드 시 'global'이 'window'로 대체됩니다.
  },
})
