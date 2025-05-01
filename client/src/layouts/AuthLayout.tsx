import React, { memo } from 'react'
import AuthSidebarLeft from './AuthSidebarLeft'
import { useLocation } from 'react-router-dom'
import { user_links } from '@/features/authentication/constants/links.constant'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const title = user_links.find((item) =>
    location.pathname.includes(item.path),
  )?.title
  return (
    <div className="flex items-start bg-white">
      <AuthSidebarLeft />
      <section className="flex-1 min-h-screen py-4 border-l">
        <h2 className="mb-4 pb-4 ml-4 leading-none inline-block relative after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-orange-500 after:rounded-lg">
          {title}
        </h2>
        {children}
      </section>
    </div>
  )
}

export default memo(AuthLayout)
