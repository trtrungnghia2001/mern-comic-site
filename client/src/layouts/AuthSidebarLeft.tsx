import { user_links } from '@/features/authentication/constants/links.constant'
import clsx from 'clsx'
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

const AuthSidebarLeft = () => {
  return (
    <section className="hidden md:block max-w-[250px] w-full min-h-screen p-4 ">
      {user_links.map((item) => (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            clsx([
              `flex items-center gap-4 px-4 py-2 rounded hover:bg-gray-100`,
              isActive && `bg-gray-100`,
            ])
          }
        >
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </NavLink>
      ))}
    </section>
  )
}

export default memo(AuthSidebarLeft)
