import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { CookiesProvider } from 'react-cookie'
import { Provider as StoreProvider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '@/styles/index.css'
import { queryClient } from '@/submodule/tanstack/client'
import { store } from '@/features/store/store'
import RootRouter from '@/RootRouter'
import RootBootstrap from '@/RootBootstrap'

const rootContainer = document.getElementById('root')

if (!rootContainer) {
  throw new Error('The root element was not found.')
}

createRoot(rootContainer).render(
  <StrictMode>
    <CookiesProvider>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <RootBootstrap rootContainer={rootContainer}>
              <RootRouter />
            </RootBootstrap>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StoreProvider>
    </CookiesProvider>
  </StrictMode>,
)
