import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import type { Connect } from 'vite'

function notFoundHtml(staticRoot: string, devServer = false): Connect.NextHandleFunction {
  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    let pathname: string
    try {
      pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://vite.local').pathname)
    } catch {
      return next()
    }
    if (pathname === '/' || pathname === '/index.html') return next()
    // In dev mode Vite serves application modules from outside publicDir.
    // Let its transform and missing-asset middleware handle every file URL.
    if (devServer && (pathname.startsWith('/@') || path.extname(pathname))) return next()

    const requested = path.resolve(staticRoot, `.${pathname}`)
    if (!requested.startsWith(`${path.resolve(staticRoot)}${path.sep}`) && requested !== path.resolve(staticRoot)) return next()
    if (existsSync(requested) && statSync(requested).isFile()) return next()

    const wantsHtml = req.headers.accept?.includes('text/html') || !path.extname(pathname) || path.extname(pathname) === '.html'
    if (!wantsHtml) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
      return res.end(req.method === 'HEAD' ? undefined : 'Not found')
    }

    const errorPage = path.join(staticRoot, '404.html')
    if (!existsSync(errorPage)) return next()
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    if (req.method === 'HEAD') return res.end()
    res.end(readFileSync(errorPage))
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sanar-static-404',
      configureServer(server) {
        server.middlewares.use(notFoundHtml(server.config.publicDir, true))
      },
      configurePreviewServer(server) {
        server.middlewares.use(notFoundHtml(path.resolve(server.config.root, server.config.build.outDir)))
      },
    },
  ],
})
