import { build } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3500",
    },
  },
})

try {
  await build(config)
  console.log('Build completed successfully!')
} catch (error) {
  console.error('Build failed:', error)
  process.exit(1)
} 