import ChapterIdPage from '@/pages/chapter-id-page'
import ComicIdPage from '@/pages/comic-id-page'
import HomePage from '@/pages/home-page'
import SearchPage from '@/pages/search-page'
import { useRoutes } from 'react-router-dom'
import AuthProtectedRouter from '@/features/authentication/contexts/AuthProtectedRouter'
import AuthRouter from './auth.router'
import AuthLayout from '@/layouts/AuthLayout'
const MainRouter = () => {
  const router = useRoutes([
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: `truyen-tranh/:slug`,
      element: <ComicIdPage />,
    },
    {
      path: `truyen-tranh/:slug/chapter/:id`,
      element: <ChapterIdPage />,
    },
    {
      path: 'tim-kiem',
      element: <SearchPage />,
    },
    {
      path: 'xep-hang/:type',
      element: <SearchPage />,
    },
    {
      path: 'the-loai/:slug',
      element: <SearchPage />,
    },
    {
      path: 'me/*',
      element: (
        <AuthProtectedRouter>
          <AuthLayout>
            <AuthRouter />
          </AuthLayout>
        </AuthProtectedRouter>
      ),
    },
  ])
  return router
}

export default MainRouter
