import { defineConfig, type Connect } from 'vite'
import { resolve } from 'node:path'

const routes: Record<string, string> = {
  '/': '/howls/howls.html',
  '/howls': '/howls/howls.html',
  '/silentvoice': '/silentvoice/silentvoice.html',
}

const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
  const path = req.url?.split('?')[0].replace(/(.)\/$/, '$1') ?? '/'
  if (routes[path]) req.url = routes[path]
  next()
}

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        howls: resolve(import.meta.dirname, 'src/howls/howls.html'),
        silentvoice: resolve(import.meta.dirname, 'src/silentvoice/silentvoice.html'),
      },
    },
  },
  plugins: [{
    name: 'routes',
    configureServer: (s) => { s.middlewares.use(rewrite) },
    configurePreviewServer: (s) => { s.middlewares.use(rewrite) },
  }],
})
