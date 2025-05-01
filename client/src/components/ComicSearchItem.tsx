import { otruyenGetImage } from '@/services/otruyen.api'
import { IComic } from '@/types/otruyen.type'
import React, { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ComicSearchItem = ({ data }: { data: IComic }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`/truyen-tranh/` + data.slug}
      onMouseDown={(e) => {
        e.preventDefault()
        navigate(`/truyen-tranh/` + data.slug)
      }}
      className="flex gap-2 p-1.5 hover:bg-gray-100"
    >
      <div className="aspect-video w-8">
        <img
          src={otruyenGetImage(data.thumb_url)}
          alt={otruyenGetImage(data.thumb_url)}
          loading="lazy"
        />
      </div>
      <div className="flex-1">{data.name}</div>
    </Link>
  )
}

export default memo(ComicSearchItem)
