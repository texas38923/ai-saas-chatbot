import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    disabled: false,
    // NOTE: workaround,  react-cropper is my nest deps
    include: ['dynamic-import-pkg > react-cropper'],
  },
  plugins: [react()],
  build: {
    // Avoid @rollup/plugin-commonjs
    commonjsOptions: {
      include: [],
    },
  },
});
