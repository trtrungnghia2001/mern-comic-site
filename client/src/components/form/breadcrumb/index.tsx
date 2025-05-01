import React, { memo } from 'react'
import { Link } from 'react-router-dom'

interface IBreadcrumb {
  title: string
  path: string
}

const Breadcrumb = ({ list }: { list: IBreadcrumb[] }) => {
  return (
    <div>
      <span>
        <Link to={`/`}>Trang chủ</Link>
      </span>
      {list?.map((item, index) => (
        <span key={index}>
          {index < list.length && <span> / </span>}
          <Link to={item.path}>{item.title}</Link>
        </span>
      ))}
    </div>
  )
}

export default memo(Breadcrumb)
