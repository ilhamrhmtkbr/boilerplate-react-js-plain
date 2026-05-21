/**
 * usePagination.js — Helper pagination
 *
 * Setiap komponen dapat instance pagination-nya sendiri (bukan singleton).
 *
 * Usage:
 *   const { currentPage, perPage, total, totalPages, setTotal, reset } = usePagination()
 *
 *   // Setelah fetch data dari API (Laravel contoh):
 *   setTotal(res.data.meta.total)
 *
 *   // Di JSX:
 *   <Pagination
 *     currentPage={currentPage}
 *     totalPages={totalPages}
 *     perPage={perPage}
 *     onPageChange={onPageChange}
 *     onPerPageChange={onPerPageChange}
 *   />
 *
 *   // Di handler:
 *   function onPageChange(page)  { setCurrentPage(page); fetchData() }
 *   function onPerPageChange(pp) { setPerPage(pp); reset(); fetchData() }
 */

import { useState, useMemo } from 'react'

export function usePagination(defaultPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage]         = useState(defaultPerPage)
  const [total, setTotal_]            = useState(0)

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / perPage)),
    [total, perPage]
  )

  function setTotal(n)    { setTotal_(n) }
  function nextPage()     { setCurrentPage(p => Math.min(p + 1, totalPages)) }
  function prevPage()     { setCurrentPage(p => Math.max(p - 1, 1)) }
  function goToPage(page) { setCurrentPage(page) }
  function reset()        { setCurrentPage(1) }

  return {
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    total,
    totalPages,
    setTotal,
    nextPage,
    prevPage,
    goToPage,
    reset,
  }
}
