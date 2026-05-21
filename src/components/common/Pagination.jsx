import { useMemo } from 'react'

/**
 * Pagination — komponen paginasi
 *
 * Props:
 *   currentPage      — halaman aktif
 *   totalPages       — total halaman
 *   perPage          — jumlah data per halaman (default: 10)
 *   perPageOptions   — opsi jumlah per halaman (default: [5, 10, 15, 25, 50])
 *   onPageChange     — (page: number) => void
 *   onPerPageChange  — (perPage: number) => void
 *
 * Usage:
 *   <Pagination
 *     currentPage={paginationMeta.current}
 *     totalPages={paginationMeta.last}
 *     perPage={paginationMeta.perPage}
 *     onPageChange={fetchData}
 *     onPerPageChange={updatePerPage}
 *   />
 *
 * Mapping API:
 *   Laravel: { current: meta.current_page, last: meta.last_page, perPage: meta.per_page }
 *   Go/Express: { current: data.page, last: data.total_pages, perPage: data.limit }
 */

export default function Pagination({
  currentPage,
  totalPages,
  perPage = 10,
  perPageOptions = [5, 10, 15, 25, 50],
  onPageChange,
  onPerPageChange,
}) {
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages])

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page)
    }
  }

  const itemClass = "min-w-[var(--xx)] min-h-[var(--xx)] max-w-[var(--xx)] max-h-[var(--xx)] border border-style-default flex items-center justify-center text-[var(--s)] rounded-[var(--radius-s)] cursor-pointer hover:bg-primary hover:text-white transition-colors"

  return (
    <div className="flex flex-wrap items-center justify-between gap-[var(--x)] mt-[var(--x)]">

      {/* Pagination Box */}
      <div className="grid font-medium shadow-box border-style-default py-[var(--s)] px-[var(--xxxx)] rounded-full">
        <div className="flex gap-[var(--m)] items-center max-w-full overflow-auto pb-[2px]"
          style={{ scrollbarWidth: 'thin' }}>

          {/* Prev */}
          <div className={`${itemClass} ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => changePage(currentPage - 1)}>
            &lt;
          </div>

          {/* Page Numbers */}
          {pages.map(page => (
            <div key={page}
              className={`${itemClass} ${page === currentPage ? 'bg-primary text-white' : ''}`}
              onClick={() => changePage(page)}>
              {page}
            </div>
          ))}

          {/* Next */}
          <div className={`${itemClass} ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => changePage(currentPage + 1)}>
            &gt;
          </div>
        </div>
      </div>

      {/* Per Page Selector */}
      <div className="flex gap-[var(--m)] w-max flex-nowrap whitespace-nowrap items-center text-[var(--s)]">
        <span>Per Page : </span>
        <select
          value={perPage}
          onChange={e => onPerPageChange?.(Number(e.target.value))}
          className="py-[3px] px-[var(--m)] rounded-[var(--radius-s)] border border-style-default bg-transparent outline-none cursor-pointer"
        >
          {perPageOptions.map(option => (
            <option key={option} value={option} className="text-black">{option}</option>
          ))}
        </select>
      </div>

    </div>
  )
}
