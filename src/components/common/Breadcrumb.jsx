import { Link, useLocation } from 'react-router-dom'

/**
 * Breadcrumb — navigasi breadcrumb otomatis dari react-router
 *
 * Usage:
 *   <Breadcrumb />
 *   Edit items di bawah sesuai kebutuhan
 */

const items = [
  { id: 1, label: 'home', to: '/' },
  { id: 2, label: 'product', to: '/product' }
]

export default function Breadcrumb() {
  const location = useLocation()

  return (
    <div className="flex flex-wrap items-center
                  gap-y-[var(--s)] gap-x-[var(--xxs)]
                  p-[var(--xs)]
                  text-[length:var(--s)]
                  rounded-[var(--radius-s)]
                  border border-line
                  w-max max-w-[85dvw]
                  text-link">
      {items.map((item, i) => (
        <span key={item.id} className="flex items-center gap-x-[var(--xxs)]">
          <Link
            to={item.to}
            className={`px-[var(--xs)] py-[2px] rounded-[var(--radius-s)] text-link capitalize cursor-pointer hover:text-primary hover:bg-transprimary
              ${location.pathname === item.to ? 'text-primary bg-transprimary' : ''}`}
          >
            {item.label}
          </Link>
          {i < items.length - 1 && <span>{'>'}</span>}
        </span>
      ))}
    </div>
  )
}
