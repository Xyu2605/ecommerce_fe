import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@interfaces': path.resolve(__dirname, './src/interfaces'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@store': path.resolve(__dirname, './src/store'),
        '@api': path.resolve(__dirname, './src/api'),
        '@features': path.resolve(__dirname, './src/features'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@assets': path.resolve(__dirname, './src/assets'),
      }
    },
});
