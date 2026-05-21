import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {HashLink} from "react-router-hash-link";

/**
 * BottomNav — navigasi bawah untuk mobile
 *
 * Cara pakai: tinggal render <BottomNav /> di AppLayout
 * Edit navItems di bawah sesuai kebutuhan
 */

const navItems = [
  { type: 'link', to: '/', text: 'Components' },
  { type: 'link', to: '/auth/login', text: 'Login' },
  {
    type: 'dropdown', text: 'Admin',
    links: [
      { to: '/admin/dashboard', text: 'Dashboard' },
      { to: '/admin/profile', text: 'Profile' },
      { to: '/admin/product', text: 'Product' },
    ]
  },
]

const linkClass = 'p-[var(--xxs)_var(--m)] rounded-[var(--radius-s)] box-border hover:bg-primary hover:text-white'
const activeLinkClass = 'bg-primary text-white'

export default function BottomNav() {
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)

  const isActive = (path) => {
    if (location.pathname === '/' && path === '/') return true
    if (path === '/') return false
    return location.pathname.includes(path)
  }

  return (
    <nav className="hidden items-center justify-between flex-wrap h-max gap-[var(--m)]
              fixed left-0 right-0 bottom-0 m-[var(--m)] p-[var(--xs)]
              bg-surface shadow-[var(--box-shadow)]
              border border-line
              rounded-[var(--radius-m)] z-[77] max-[800px]:flex">

      {navItems.map(item => {
        if (item.type === 'link') {
          return (
            <HashLink
              key={item.text}
              to={item.to}
              className={`${linkClass} ${isActive(item.to) ? activeLinkClass : 'bg-transprimary'}`}
            >
              {item.text}
            </HashLink>
          )
        }

        if (item.type === 'dropdown') {
          const anyActive = item.links.some(l => isActive(l.to))
          return (
            <div key={item.text}>
              <button
                className={`${linkClass} ${anyActive ? activeLinkClass : 'bg-transprimary'}`}
                onClick={() => setOpenDropdown(openDropdown === item.text ? null : item.text)}
              >
                {item.text}
              </button>

              {openDropdown === item.text && (
                <div className="fixed inset-0 bg-transtext z-[99] flex">
                  <div className="grid m-auto bg-surface shadow-[var(--box-shadow)]
                              border border-line rounded-[var(--radius-m)]
                              min-w-[77dvw] max-w-[77dvw] min-h-[77dvh] max-h-[77dvh]
                              grid-cols-1 auto-rows-max gap-[var(--m)] place-items-center box-border
                              p-[var(--m)] overflow-auto">
                    <button
                      className="bg-danger text-end
                                min-w-[22px] max-w-[22px] min-h-[22px] max-h-[22px]
                                flex align-center justify-center font-['Medium',_sans-serif]
                                text-white rounded-full justify-self-end"
                      onClick={() => setOpenDropdown(null)}
                    >&Cross;</button>
                    {item.links.map(child => (
                      <HashLink
                        key={child.to}
                        to={child.to}
                        className={`${linkClass} w-full ${isActive(child.to) ? activeLinkClass : 'bg-transprimary'}`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.text}
                      </HashLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        }

        return null
      })}
    </nav>
  )
}
