import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  const isDevelopment = command === 'serve'

  const getBaseUrl = () => {
    // github pages production
    if (isProduction) return '/boilerplate-react-js-plain/'

    // ngrok
    if (env.VITE_APP_FRONTEND_STUDENT_URL?.includes('ngrok')) {
      return '/student/'
    }

    return '/'
  }

  return {
    base: getBaseUrl(),

    plugins: [
      react(),
      tailwindcss(),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true,

      allowedHosts: [
        'localhost',
        '127.0.0.1',
        '.iamra.site',
        '.ngrok-free.app',
      ],

      hmr: {
        overlay: true,
        host: isDevelopment ? env.VITE_HMR : undefined,
        protocol: env.VITE_USE_HTTPS === 'true' ? 'wss' : 'ws',
        clientPort: env.VITE_USE_HTTPS === 'true' ? 443 : 5173,
      },

      watch: {
        usePolling:
          !!env.VITE_USE_POLLING ||
          process.env.NODE_ENV === 'docker',
        interval: 1000,
        ignored: ['**/node_modules/**', '**/.git/**'],
      },
    },

    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      minify: isProduction,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // router
              if (id.includes('react-router')) {
                return 'router'
              }

              // react core
              if (
                id.includes('react') ||
                id.includes('react-dom')
              ) {
                return 'vendor'
              }

              // form validation
              if (
                id.includes('react-hook-form') ||
                id.includes('@hookform') ||
                id.includes('yup')
              ) {
                return 'form'
              }

              // i18n
              if (
                id.includes('i18next') ||
                id.includes('react-i18next')
              ) {
                return 'i18n'
              }

              // http
              if (id.includes('axios')) {
                return 'http'
              }

              // utility libs
              return 'lib'
            }
          },
        },
      },

      // warning ukuran chunk
      chunkSizeWarningLimit: 1000,
    },

    envPrefix: ['VITE_'],

    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        'react-hook-form',
        '@hookform/resolvers',
        'yup',
      ],
    },
  }
})