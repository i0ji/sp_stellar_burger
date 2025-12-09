import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ----------------------------------------------------
  // НОВАЯ СЕКЦИЯ CSS
  // ----------------------------------------------------
  css: {
    preprocessorOptions: {
      scss: {
        // Эти файлы подключатся автоматически к КАЖДОМУ scss-файлу.
        // Обратите внимание: мы используем ваш алиас "styles/"
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
      store: '/src/store',
      components: '/src/components',
      common: '/src/components/common/',
      pages: '/src/pages',
      styles: '/src/styles', // Этот алиас используется в additionalData выше
      utils: '/src/services/utils/',
      images: '/src/images',
      slices: '/src/services/slices',
      hooks: '/src/services/hooks',
      modal: '/src/components/Modal',
      services: '/src/services',
      interfaces: '/src/utils/interfaces',
      declarations: '/src/services/declarations',
      profile: '/src/pages/ProfilePage',
      src: '.',
      ingredients: '/src/pages/IngredientDetailsPage',
      orders: '/src/pages/OrderDetailsPage',
    },
  },
});
