import ComicCard from '@/components/ComicCard'
import LoaderComponent from '@/components/container/loader-component'
import PaginateComponent from '@/components/container/paginate-component'
import ENV_CONFIG from '@/configs/env.config'
import { useHistoryStore } from '@/features/history/stores/history.store'
import useSearchParamsValue from '@/hooks/useSearchParamsValue'
import { otruyenGetComicApi } from '@/services/otruyen.api'
import { IComic, IComicDetail } from '@/types/otruyen.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const HistoriesPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue({
    data_type: ENV_CONFIG.DATA_TYPE,
  })
  const { histories, getHistories, removeHistories } = useHistoryStore()

  const dataResult = useQuery({
    queryKey: ['histories', histories, searchParams.toString()],
    queryFn: async () => {
      const data = await getHistories(searchParams.toString())
      const comics = await Promise.all(
        data?.data?.results?.map(async (history) => {
          const response = await otruyenGetComicApi(history.data_id)
          const item: IComicDetail = response?.data?.item
          return {
            ...item,
            chaptersLatest: [
              item.chapters?.[0]?.server_data?.[
                item.chapters?.[0]?.server_data?.length - 1
              ],
            ],
          }
        }),
      )
      return {
        comics,
        data,
      }
    },
  })
  const removeHistoriesResult = useMutation({
    mutationFn: async () => {
      return await removeHistories(`data_type=comic`)
    },
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      {dataResult.isLoading && <LoaderComponent />}
      <div className="bg-white rounded p-4 space-y-8">
        {dataResult?.data && dataResult?.data?.comics?.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>You can clear your reading history for a fresh start.</span>
              <button
                onClick={() => removeHistoriesResult.mutate()}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-full text-xs "
              >
                Clear Histories
              </button>
            </div>
            <div className="grid gap-4 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {dataResult?.data?.comics?.map((item) => {
                return (
                  <ComicCard
                    key={item?.slug}
                    data={item as unknown as IComic}
                  />
                )
              })}
            </div>
          </>
        )}
        {dataResult.data?.comics?.length === 0 && (
          <div>Không tìm thấy kết quả nào.</div>
        )}
        {!dataResult.isLoading && dataResult.data && (
          <PaginateComponent
            forcePage={
              Number(dataResult?.data?.data?.data.pagination._page) - 1
            }
            pageCount={dataResult?.data?.data?.data.pagination.total_pages}
            onPageChange={(page) =>
              handleSearchParams('_page', (page.selected + 1).toString())
            }
          />
        )}
      </div>
    </>
  )
}

export default HistoriesPage
