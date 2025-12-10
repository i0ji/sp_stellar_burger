import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "styles/theme_colors" as *;
          @use "styles/size" as *;
          @use "styles/mixins" as *;
        `,
      },
    },
  },

  base: './',
  build: {
    outDir: './build',
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      store: path.resolve(__dirname, './src/store'),
      components: path.resolve(__dirname, './src/components'),
      common: path.resolve(__dirname, './src/components/common'),
      pages: path.resolve(__dirname, './src/pages'),
      styles: path.resolve(__dirname, './src/styles'),
      utils: path.resolve(__dirname, './src/services/utils'),
      images: path.resolve(__dirname, './src/images'),
      slices: path.resolve(__dirname, './src/services/slices'),
      hooks: path.resolve(__dirname, './src/services/hooks'),
      modal: path.resolve(__dirname, './src/components/Modal'),
      services: path.resolve(__dirname, './src/services'),
      interfaces: path.resolve(__dirname, './src/utils/interfaces'),
      declarations: path.resolve(__dirname, './src/services/declarations'),
      profile: path.resolve(__dirname, './src/pages/ProfilePage'),
      ingredients: path.resolve(__dirname, './src/pages/IngredientDetailsPage'),
      orders: path.resolve(__dirname, './src/pages/OrderDetailsPage'),
    },
  },
});
