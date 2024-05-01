// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    define: {
      global: 'window', // 이렇게 해서 빌드 시 'global'이 'window'로 대체됩니다.
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER_ADDRESS,
          // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
          changeOrigin: true,
          // 요청 경로에서 '/api' 제거
          rewrite: path => path.replace(/^\/api/, ''),
          // SSL 인증서 검증 무시
          secure: false,
          ws: true,
        },
        '/hls': {
          target: `${env.VITE_STREAM_ADDRESS}/hls`, // 원하는 서버 주소로 대체하세요
          changeOrigin: true,
        },
        '/ws': {
          target: env.VITE_SERVER_ADDRESS, // 원하는 서버 주소로 대체하세요
          rewrite: path => path.replace(/^\/ws/, ''),
          ws: true,
          port: 80,
        },
      },
      port: 3000, // 여기서 원하는 포트 번호로 변경합니다.
    },
  });
};
