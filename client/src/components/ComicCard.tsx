import { otruyenGetChapterId, otruyenGetImage } from '@/services/otruyen.api'
import { IComic } from '@/types/otruyen.type'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const ComicCard = ({ data }: { data: IComic }) => {
  return (
    <div className="space-y-1">
      <Link to={`/truyen-tranh/` + data.slug}>
        <div className="aspect-thumbnail">
          <img
            src={otruyenGetImage(data.thumb_url)}
            alt={otruyenGetImage(data.thumb_url)}
            loading="lazy"
          />
        </div>
      </Link>
      <h4>
        <Link
          className="leading-5 line-clamp-1"
          to={`/truyen-tranh/` + data.slug}
        >
          {data.name}
        </Link>
      </h4>
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
  )
}

export default memo(ComicCard)
