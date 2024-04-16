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
  server: {
    port: 3000 // 여기서 원하는 포트 번호로 변경합니다.
  },
})
