import { Route, Routes } from 'react-router'
import {
  PATH_BROWSE_ABOUT,
  PATH_BROWSE_MYLIST,
  PATH_BROWSE,
  PATH_REGISTER,
  PATH_ROOT,
  PATH_SIGN_UP,
  PATH_BROWSE_SEARCH,
} from '@/route/routes'
import { lazy, Suspense } from 'react'
import Loader from '@/submodule/components/Loader/Loader'
import PermissionRedirect from './PermissionRedirect'

const App = lazy(() => import('@/features/App/App'))
const SignIn = lazy(() => import('@/features/App/components/SignIn'))
const SignUp = lazy(() => import('@/features/App/components/SignUp'))
const Register = lazy(() => import('@/features/App/components/Register'))
const Browse = lazy(() => import('@/features/Browse/Browse'))
const BrowseMain = lazy(
  () => import('@/features/Browse/components/BrowseMain/BrowseMain'),
)
const BrowseMyList = lazy(
  () => import('@/features/Browse/components/BrowseMyList/BrowseMyList'),
)
const BrowseAbout = lazy(
  () => import('@/features/Browse/components/BrowseAbout/BrowseAbout'),
)
const Search = lazy(
  () => import('@/features/Browse/components/BrowseSearch/BrowseSearch'),
)
const NotFoundPage = lazy(
  () => import('@/features/App/components/NotFoundPage'),
)

export default function RootRouter() {
  return (
    <Routes>
      <Route
        path={PATH_ROOT}
        element={
          <Suspense fallback={<Loader />}>
            <PermissionRedirect
              permissionCheck="public"
              redirectPath={PATH_BROWSE}
            >
              <App />
            </PermissionRedirect>
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path={PATH_SIGN_UP}
          element={
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path={PATH_REGISTER}
          element={
            <Suspense fallback={<Loader type="secondary" />}>
              <Register />
            </Suspense>
          }
        />
      </Route>

      <Route
        path={PATH_BROWSE}
        element={
          <Suspense fallback={<Loader />}>
            <PermissionRedirect
              permissionCheck="private"
              redirectPath={PATH_ROOT}
            >
              <Browse />
            </PermissionRedirect>
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
          path={PATH_BROWSE_MYLIST}
          element={
            <Suspense fallback={<Loader />}>
              <BrowseMyList />
            </Suspense>
          }
        />
        <Route
          path={PATH_BROWSE_ABOUT}
          element={
            <Suspense fallback={<Loader />}>
              <BrowseAbout />
            </Suspense>
          }
        />

        <Route
          path={PATH_BROWSE_SEARCH}
          element={
            <Suspense fallback={<Loader />}>
              <Search />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
