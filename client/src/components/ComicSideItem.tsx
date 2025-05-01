import { otruyenGetChapterId, otruyenGetImage } from '@/services/otruyen.api'
import { IComic } from '@/types/otruyen.type'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const ComicSideItem = ({ data }: { data: IComic }) => {
  return (
    <div className="relative leading-none overflow-hidden">
      <Link to={`/truyen-tranh/` + data.slug}>
        <div className="aspect-thumbnail">
          <img
            src={otruyenGetImage(data.thumb_url)}
            alt={otruyenGetImage(data.thumb_url)}
            loading="lazy"
          />
        </div>
      </Link>
      <div className="bg-black/60 text-white p-2 absolute bottom-0 left-0 right-0 space-y-1">
        <h5 className="line-clamp-1">
          <Link to={`/truyen-tranh/${data?.slug}`}>{data?.name}</Link>
        </h5>
        <h5>
          {data.chaptersLatest ? (
            <Link
              to={
                `/truyen-tranh/` +
                data.slug +
                `/chapter/` +
                otruyenGetChapterId(data.chaptersLatest?.[0]?.chapter_api_data)
              }
            >
              Chapter {data.chaptersLatest?.[0]?.chapter_name}
            </Link>
          ) : (
            <span>No chapter</span>
          )}
        </h5>
      </div>
    </div>
  )
}

export default memo(ComicSideItem)
