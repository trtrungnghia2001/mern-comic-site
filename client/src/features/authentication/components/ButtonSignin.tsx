import React, { memo, useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../stores/auth.store'
import { Button } from 'antd'
import { IMAGE_DEFAULT } from '@/constants/image.constant'
import { user_links } from '../constants/links.constant'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { PiSignOut } from 'react-icons/pi'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const ButtonSignin = () => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }

    window.addEventListener('mousedown', handler)

    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const {
    isLoggedIn,
    user,
    signinWithSocialMedia,
    signinPassportSuccess,
    signout,
  } = useAuthStore()
  const signoutResult = useMutation({
    mutationFn: async () => {
      return await signout()
    },
    onSuccess: (data) => {
      toast.success(data?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
  const handleLoginWithGoogle = () => {
    signinWithSocialMedia('google')
  }

  const signinPassportSuccessResult = useQuery({
    queryKey: [`signinPassportSuccess`],
    queryFn: async () => {
      return await signinPassportSuccess()
    },
    enabled: !isLoggedIn,
    retry: 1,
  })

  const [showMenu, setShowMenu] = useState(false)

  if (!isLoggedIn)
    return (
      <Button onClick={handleLoginWithGoogle} type="primary">
        Signin
      </Button>
    )

  return (
    <div className="relative z-50" ref={menuRef}>
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="w-8 h-8 bg-white overflow-hidden rounded-full cursor-pointer"
      >
        <img
          src={user?.avatar || IMAGE_DEFAULT.avatar_notfound_image}
          alt={user?.avatar}
          loading="lazy"
        />
      </div>
      {showMenu && isLoggedIn && (
        <ul className="mt-1 w-52 absolute top-full right-0 p-2 rounded bg-white shadow">
          {user_links?.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx([
                    `hover:bg-gray-100 rounded flex items-center gap-2 px-3 py-1.5 w-full`,
                    isActive && `bg-gray-100`,
                  ])
                }
                onClick={() => setShowMenu(false)}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => signoutResult.mutate()}
              className={clsx([
                `hover:bg-gray-100 rounded flex items-center gap-2 px-3 py-1.5 w-full`,
              ])}
            >
              <PiSignOut /> <span>Signout</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default memo(ButtonSignin)
