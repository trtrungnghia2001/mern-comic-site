import { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import UpdateProfilePage from '@/pages/auth/update-profile-page'
import ChangePasswordPage from '@/pages/auth/change-password-page'
import FavoritesPage from '@/pages/auth/favorites-page'
import LikesPage from '@/pages/auth/likes-page'
import HistoriesPage from '@/pages/auth/histories-page'
import CommentsPage from '@/pages/auth/comments-page'
const AuthRouter = () => {
  const router = useRoutes([
    {
      path: 'update-profile',
      element: <UpdateProfilePage />,
    },
    {
      path: `change-password`,
      element: <ChangePasswordPage />,
    },
    {
      path: `favorites`,
      element: <FavoritesPage />,
    },
    {
      path: `likes`,
      element: <LikesPage />,
    },
    {
      path: `histories`,
      element: <HistoriesPage />,
    },
    {
      path: `comments`,
      element: <CommentsPage />,
    },
  ])
  return router
}

export default memo(AuthRouter)
