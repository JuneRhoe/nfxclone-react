import { Route, Routes } from 'react-router'
import { browsePath, registerPath, rootPath, signUpPath } from '@/routes'
import { lazy, Suspense, useState } from 'react'
import Loader from '@/submodule/components/Loader/Loader'
import { ThemeInfoContext, ThemeType } from './context'

const AppMain = lazy(
  () => import('@/features/App/components/AppMain/AppMain.tsx'),
)
const Browse = lazy(() => import('@/features/Browse/Browse.tsx'))
const BrowseMain = lazy(
  () => import('@/features/Browse/components/BrowseMain/BrowseMain.tsx'),
)
const NotFoundPage = lazy(
  () => import('@/features/App/components/NotFoundPage.tsx'),
)

function App() {
  const [themeType, setThemeType] = useState<ThemeType>('darkMode')

  return (
    <ThemeInfoContext.Provider
      value={{
        themeType,
        setThemeType,
      }}
    >
      <Routes>
        <Route
          path={rootPath}
          element={
            <Suspense fallback={<Loader />}>
              <AppMain displayType="signIn" />
            </Suspense>
          }
        />
        <Route
          path={signUpPath}
          element={
            <Suspense fallback={<Loader />}>
              <AppMain displayType="signUp" />
            </Suspense>
          }
        />
        <Route
          path={registerPath}
          element={
            <Suspense fallback={<Loader />}>
              <AppMain displayType="register" />
            </Suspense>
          }
        />
        <Route
          path={browsePath}
          element={
            <Suspense fallback={<Loader />}>
              <Browse />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <BrowseMain />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeInfoContext.Provider>
  )
}

export default App
