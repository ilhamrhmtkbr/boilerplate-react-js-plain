import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {HashLink} from "react-router-hash-link";

/**
 * ContentHeader — header sticky dengan nav desktop + hamburger menu
 *
 * Props:
 *   onToggleShow — callback ketika hamburger diklik (untuk toggle sidebar)
 *
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

const spanClass = `relative before:content-[''] before:absolute before:w-0 before:h-[3px]
  before:bottom-0 before:left-1/2 before:-translate-x-1/2
  before:rounded-[4px] before:bg-primary
  before:transition-[width,left] before:duration-300 before:ease-in-out
  group-hover:before:w-full`

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
}

export default function ContentHeader({ onToggleShow }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (location.pathname === '/' && path === '/') return true
    if (path === '/') return false
    return location.pathname.includes(path)
  }

  const showMenu = () => {
    setShowSidebar(v => !v)
    onToggleShow?.()
  }

  return (
    <header className="sticky top-[var(--m)] box-border
                    min-h-[var(--height-container-header)] max-h-[var(--height-container-header)]
                    bg-sidebar backdrop-blur-sm flex items-center justify-between
                    px-[var(--m)] rounded-[var(--radius-m)]">

      <div className="cursor-pointer text-link hover:underline" onClick={toggleDarkMode}>Dark Mode</div>

      {/* Nav Desktop */}
      <div className="flex items-center gap-[var(--m)] h-[var(--height-container-header)] max-[800px]:hidden">
        {navItems.map(item => {
          if (item.type === 'link') {
            return (
              <HashLink
                key={item.text}
                to={item.to}
                className="relative cursor-pointer flex items-center h-[var(--height-container-header)] group"
              >
                <span className={`${spanClass} ${isActive(item.to) ? 'before:w-full' : ''}`}>
                  {item.text}
                </span>
              </HashLink>
            )
          }

          if (item.type === 'dropdown') {
            const spanClassChild = spanClass.replace('group-hover:before:w-full', 'group-hover/item:before:w-full')
            return (
              <div key={item.text} className="relative group/menu">
                <div className="relative cursor-pointer flex items-center h-[var(--height-container-header)]">
                  {item.text}
                </div>
                <div className="hidden absolute bg-surface
                                shadow-[var(--box-shadow)] rounded-[var(--radius-m)]
                                border border-line
                                top-[var(--height-container-header)] right-0
                                box-border p-[var(--m)] group-hover/menu:block">
                  {item.links.map(child => (
                    <HashLink
                      key={child.to}
                      to={child.to}
                      className="relative cursor-pointer flex items-center group/item h-max p-[var(--xxs)_0]"
                    >
                      <span className={`${spanClassChild} ${isActive(child.to) ? 'before:w-full' : ''}`}>
                        {child.text}
                      </span>
                    </HashLink>
                  ))}
                </div>
              </div>
            )
          }

          return null
        })}
      </div>

      {/* Hamburger */}
      <div className="bg-transparent border-0 cursor-pointer p-0 hidden max-[800px]:block" onClick={showMenu}>
        <svg id="get-menu" viewBox="0 0 100 100" className="min-w-[31px] min-h-[31px] max-w-[31px] max-h-[31px]">
          <path
            className={`fill-none stroke-text stroke-[8] transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] [stroke-dasharray:60_207] ${!showSidebar ? '[stroke-dasharray:90_207] [stroke-dashoffset:-134]' : ''}`}
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path
            className={`fill-none stroke-text stroke-[8] transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] [stroke-dasharray:60_60] ${!showSidebar ? '[stroke-dasharray:1_60] [stroke-dashoffset:-60]' : ''}`}
            d="M 20,50 H 80"
          />
          <path
            className={`fill-none stroke-text stroke-[8] transition-[stroke-dasharray,stroke-dashoffset] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] [stroke-dasharray:60_207] ${!showSidebar ? '[stroke-dasharray:90_207] [stroke-dashoffset:-134]' : ''}`}
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </div>

    </header>
  )
}
