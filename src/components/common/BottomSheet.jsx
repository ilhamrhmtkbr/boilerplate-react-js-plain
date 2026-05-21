import { useState } from 'react'

/**
 * BottomSheet — sheet dari bawah layar
 *
 * Props:
 *   trigger  — JSX untuk tombol trigger (opsional)
 *   header   — JSX untuk header sheet (opsional)
 *   children — konten sheet
 *
 * Usage:
 *   <BottomSheet
 *     trigger={<div className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Open</div>}
 *     header={<>🖱</>}
 *   >
 *     <h1>Custom Content</h1>
 *     <p>Isi bebas</p>
 *   </BottomSheet>
 */

export default function BottomSheet({ trigger, header, children }) {
  const [active, setActive] = useState(false)

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setActive(v => !v)}>
        {trigger ?? (
          <div className="inline-block cursor-pointer px-[var(--x)] py-[var(--xxs)] font-medium bg-[var(--primary-color)] text-white rounded">
            Trigger
          </div>
        )}
      </div>

      {/* Sheet */}
      <div
        className={`fixed z-[999] left-1/2 -translate-x-1/2
              bg-surface
              h-[85dvh] w-[90dvw]
              border-t border-l border-r
              rounded-t-[var(--radius-m)]
              border-border
              overflow-hidden box-border
              transition-all duration-300 ease-in
              ${active ? 'bottom-0' : '-bottom-[86dvh]'}`}
      >
        {/* Header */}
        <div
          className="min-h-[8dvh] flex items-center justify-center cursor-pointer
                    transition-all duration-300
                    text-[length:var(--l)]
                    hover:bg-[var(--transprimary-color)]
                    hover:text-primary
                    hover:scale-[1.07]"
          onClick={() => setActive(v => !v)}
        >
          {header ?? '🖱'}
        </div>

        {/* Content */}
        <div className="grid auto-rows-max max-h-[77dvh]
                      overflow-x-hidden overflow-y-auto
                      box-border
                      py-[var(--m)] mx-[var(--m)]
                      border-border border-t">
          {children}
        </div>
      </div>
    </>
  )
}
