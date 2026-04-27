import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vitest-angular';

export default defineConfig({
  plugins: [angular()],
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setup-vitest.ts'],
  },
});