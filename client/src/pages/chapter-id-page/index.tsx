import ButtonChapterPrevAndNext from '@/components/ButtonChapterPrevAndNext'
import LoaderComponent from '@/components/container/loader-component'
import ENV_CONFIG from '@/configs/env.config'
import { useAuthStore } from '@/features/authentication/stores/auth.store'
import CommentContainer from '@/features/comment/components/CommentContainer'
import { useHistoryStore } from '@/features/history/stores/history.store'
import {
  otruyenGetChapterApi,
  otruyenGetComicApi,
} from '@/services/otruyen.api'
import { IComicChapter, IComicDetail } from '@/types/otruyen.type'
import { useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const ChapterIdPage = () => {
  const { id, slug } = useParams()

  const dataResult = useQuery({
    queryKey: ['chapter', id],
    queryFn: async () => {
      return (await otruyenGetChapterApi(id as string))?.data as IComicChapter
    },
    enabled: !!id,
  })
  const getComicIdResult = useQuery({
    queryKey: ['comic', slug],
    queryFn: async () => await otruyenGetComicApi(slug as string),
    enabled: !!slug,
  })
  const comicData = useMemo(() => {
    return getComicIdResult.data?.data?.item as IComicDetail
  }, [getComicIdResult.data])

  const { isLoggedIn, user } = useAuthStore()
  const { addHistory } = useHistoryStore()
  const addHistoryResult = useQuery({
    queryKey: ['history', 'add', id],
    queryFn: async () => {
      return await addHistory({
        data_id: slug as string,
        data_type: ENV_CONFIG.DATA_TYPE,
        chapter_id: id as string,
      })
    },
    enabled: !!(isLoggedIn && slug && id && user),
  })

  return (
    <>
      {(dataResult.isLoading ||
        getComicIdResult.isLoading ||
        addHistoryResult.isLoading) && <LoaderComponent />}
      <div className="max-w-[1000px] w-full mx-auto space-y-4">
        {/* top */}
        <ButtonChapterPrevAndNext
          comicData={comicData}
          id={id as string}
          slug={slug as string}
        />
        {/* list image */}
        <div>
          <ul className="space-y-2">
            {dataResult?.data?.item?.chapter_image?.map((item) => (
              <li key={item.image_page} className="w-full">
                <img
                  src={
                    dataResult?.data?.domain_cdn +
                    '/' +
                    dataResult.data?.item?.chapter_path +
                    '/' +
                    item?.image_file
                  }
                  alt=""
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
        {/* bottom */}
        <ButtonChapterPrevAndNext
          comicData={comicData}
          id={id as string}
          slug={slug as string}
        />
        {/* comment */}
        <CommentContainer data_id={slug as string} data_type="comic" />
      </div>
    </>
  )
}

export default ChapterIdPage
