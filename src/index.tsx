import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { CookiesProvider } from 'react-cookie'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@/styles/index.css'
import App from '@/features/App/App.tsx'
import { queryClient } from './submodule/tanstack/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>,
)
