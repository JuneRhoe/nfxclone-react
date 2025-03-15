import { Route, Routes } from 'react-router'
import {
  browseAboutPath,
  browseMyListPath,
  browsePath,
  registerPath,
  rootPath,
  signUpPath,
} from '@/routes'
import { lazy, Suspense } from 'react'
import Loader from '@/submodule/components/Loader/Loader'

const AppMain = lazy(
  () => import('@/features/App/components/AppMain/AppMain.tsx'),
)
const Browse = lazy(() => import('@/features/Browse/Browse.tsx'))
const BrowseMain = lazy(
  () => import('@/features/Browse/components/BrowseMain/BrowseMain.tsx'),
)
const BrowseMyList = lazy(
  () => import('@/features/Browse/components/BrowseMyList/BrowseMyList.tsx'),
)
const BrowseAbout = lazy(
  () => import('@/features/Browse/components/BrowseAbout/BrowseAbout.tsx'),
)
const NotFoundPage = lazy(
  () => import('@/features/App/components/NotFoundPage.tsx'),
)

export default function AppRouter() {
  return (
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
          <Suspense fallback={<Loader type="secondary" />}>
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
        <Route
          path={browseMyListPath}
          element={
            <Suspense fallback={<Loader />}>
              <BrowseMyList />
            </Suspense>
          }
        />
        <Route
          path={browseAboutPath}
          element={
            <Suspense fallback={<Loader />}>
              <BrowseAbout />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
