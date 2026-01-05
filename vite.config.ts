import { defineConfig } from 'vite'

export default defineConfig({
    // Pointing root to public so index.html works there if that is strictly where it lives
    // But typically usage requires index.html to refer to /src/main.ts
    root: 'public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
    server: {
        open: true
    },
    resolve: {
        alias: {
            '/src': '/../src'
        }
    }
})
