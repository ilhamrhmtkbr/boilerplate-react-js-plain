import { useEffect } from 'react'

/**
 * Toast — notifikasi toast dari pojok kanan bawah
 *
 * Props:
 *   show    — Boolean tampilkan toast
 *   message — teks pesan (default: 'Default Message')
 *   type    — primary | success | danger | warning (default: 'primary')
 *   onClose — callback ketika toast ditutup
 *
 * Usage:
 *   <Toast
 *     show={isToastVisible}
 *     message="Data Berhasil Disimpan!"
 *     type="success"
 *     onClose={() => setIsToastVisible(false)}
 *   />
 */

const typeClass = {
  primary: 'bg-primary',
  success: 'bg-success',
  danger:  'bg-danger',
  warning: 'bg-warning',
}

export default function Toast({ show = false, message = 'Default Message', type = 'primary', onClose }) {
  return (
    <>
      <div
        className={`fixed right-[var(--m)] bottom-[100px] z-[99] w-max text-white
          transition-all duration-300 ease-in-out
          ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[20px] pointer-events-none'}`}
      >
        <div className={`break-all py-[var(--s)] px-[var(--l)] border border-line rounded-[var(--radius-m)] flex items-center gap-[var(--m)] max-w-[75dvw] h-max box-border ${typeClass[type] ?? 'bg-primary'}`}>
          <p className="flex-1">{message}</p>

          {/* Close Button */}
          <div
            onClick={onClose}
            className="min-w-[23px] min-h-[23px] max-w-[23px] max-h-[23px] flex items-center justify-center border-2 border-transparent rounded-full bg-surface text-danger cursor-pointer hover:bg-danger hover:border-white hover:text-white transition-all group"
          >
            <svg className="w-2 h-2 fill-danger group-hover:fill-bg transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
              <path d="M8 1l5 6 6-6c2-1 5-1 6 0 2 2 2 5 0 7l-5 5 5 6c2 2 2 5 0 6-1 2-4 2-6 0l-6-5-5 5c-2 2-5 2-7 0-1-1-1-4 0-6l6-6-6-5C0 6 0 3 1 1c2-1 5-1 7 0z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
