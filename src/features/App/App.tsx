import { Route, Routes } from 'react-router'
import { rootPath } from '@/routes'
import { lazy, Suspense } from 'react'
import Loader from '@/components/Loader/Loader'

const Main = lazy(() => import('@/features/App/components/Main/Main.tsx'))
const MainContents = lazy(
  () => import('@/features/App/components/Main/components/MainContents.tsx'),
)
const NotFoundPage = lazy(
  () => import('@/features/App/components/NotFoundPage/NotFoundPage'),
)

function App() {
  return (
    <Routes>
      <Route
        path={rootPath}
        element={
          <Suspense fallback={<Loader />}>
            <Main />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <MainContents />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
