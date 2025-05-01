import { FaUser } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'

export const navList = [
  {
    title: 'Truyện mới',
    path: '/truyen-moi',
  },
  {
    title: 'Sắp ra mắt',
    path: '/sap-ra-mat',
  },
  {
    title: 'Đang phát hành',
    path: '/dang-phat-hanh',
  },
  {
    title: 'Hoàn thành',
    path: '/hoan-thanh',
  },
]

export const admin_links = [
  {
    title: 'Users',
    path: '/admin/users',
    icon: <FaUser />,
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: <IoIosSettings />,
  },
  {
    title: 'Logs',
    path: '/admin/logs',
    icon: <IoIosSettings />,
  },
]
