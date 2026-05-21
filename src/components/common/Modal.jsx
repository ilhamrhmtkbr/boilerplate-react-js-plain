/**
 * Modal — dialog modal
 *
 * Props:
 *   isOpen   — Boolean (tampilkan modal)
 *   title    — judul modal (default: 'Title')
 *   onClose  — callback ketika modal ditutup
 *   children — konten modal
 *   footer   — JSX untuk footer (opsional)
 *
 * Usage:
 *   <Modal isOpen={showModal} title="Konfirmasi" onClose={() => setShowModal(false)}
 *     footer={<p>Footer content</p>}>
 *     <p>Konten modal</p>
 *   </Modal>
 */

export default function Modal({ isOpen = false, title = 'Title', onClose, children, footer }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex bg-transtext dark:bg-transbg z-[99]">
      {/* Modal Box */}
      <div className="dark:border dark:border-solid dark:border-primary m-auto w-[90dvw] md:w-[75dvw] max-h-[90dvh] bg-surface box-border rounded-[var(--radius-m)] p-[var(--xxx)] grid grid-rows-[max-content_1fr_max-content] gap-[var(--m)]">

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-[var(--l)] mb-[var(--m)] text-[var(--l)] font-bold">
          <p>{title}</p>
          <div
            className="min-w-[23px] min-h-[23px] max-w-[23px] max-h-[23px]
                      flex items-center justify-center
                      border-2 rounded-full cursor-pointer
                      bg-surface border-danger text-danger
                      hover:bg-danger hover:text-white"
            onClick={onClose}
          >
            <svg className="max-w-[9px] max-h-[9px] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27">
              <path d="M8 1l5 6 6-6c2-1 5-1 6 0 2 2 2 5 0 7l-5 5 5 6c2 2 2 5 0 6-1 2-4 2-6 0l-6-5-5 5c-2 2-5 2-7 0-1-1-1-4 0-6l6-6-6-5C0 6 0 3 1 1c2-1 5-1 7 0z" />
            </svg>
          </div>
        </div>

        {/* Modal Content */}
        <div className="grid auto-rows-max gap-[var(--x)] items-start justify-items-center overflow-auto relative p-[var(--x)] box-border">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="pt-[var(--l)] mt-[var(--m)] text-center text-[var(--s)] text-link">
            {footer}
          </div>
        )}

      </div>
    </div>
  )
}
