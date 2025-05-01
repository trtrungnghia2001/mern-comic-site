import InputSearch from '@/components/form/input-search'
import { IMAGE_FORMAT } from '@/constants/image.constant'
import ButtonSignin from '@/features/authentication/components/ButtonSignin'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div
      style={{
        background: `url(${IMAGE_FORMAT.bg_header}) no-repeat center/cover`,
      }}
      className="z-20 shadow"
    >
      <div className="max-w-[1332px] w-full px-4 py-2 mx-auto flex items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Link
            to={`/`}
            className="font-bold text-base text-white w-[150px] block"
          >
            <img
              src="https://nettruyenrr.com/public/assets/images/logo-nettruyen.png"
              loading="lazy"
              alt=""
            />
          </Link>
          <div className="flex-1 hidden sm:block">
            <InputSearch />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ButtonSignin />
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
