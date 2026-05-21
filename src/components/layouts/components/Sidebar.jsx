import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {HashLink} from 'react-router-hash-link'

/**
 * Sidebar — navigasi samping
 *
 * Props:
 *   isSidebarCollapsed — Boolean
 *   showSidebar        — Boolean
 *   navItems           — Array of nav items
 *   onToggle           — callback untuk toggle collapse
 *
 * Format navItems:
 * [
 *   { type: 'link', to: '/dashboard', svg: 'dashboard', text: 'Dashboard' },
 *   {
 *     type: 'sublinks', svg: 'courses', text: 'Courses',
 *     links: [
 *       { to: '/courses/progress', svg: 'progress', text: 'Progress' },
 *     ]
 *   },
 * ]
 */

export default function Sidebar({ isSidebarCollapsed, showSidebar, navItems = [], onToggle }) {
  const location = useLocation()
  const [openSublinks, setOpenSublinks] = useState({})

  const sidebarWidth = isSidebarCollapsed
    ? 'w-[var(--width-sidebar-collapse)]'
    : 'w-[var(--width-sidebar-expanded)] max-[800px]:w-[95dvw]'

  const showSidebarClass = showSidebar ? 'max-[800px]:left-[0]' : 'max-[800px]:left-[-275px]'

  const sidebarLinkActive = (to) =>
    location.pathname.includes(to) ? 'text-secondary font-medium bg-transbg' : ''

  const sidebarLinkActiveSvg = (to) =>
    location.pathname.includes(to) ? 'fill-secondary' : ''

  const isSublinksActive = (links) =>
    links.some(link => location.pathname.includes(link.to))

  const sidebarTooltip = isSidebarCollapsed
    ? `after:content-[attr(data-title)]
      after:invisible after:opacity-0
      after:bg-surface after:text-text
      after:rounded-[var(--radius-l)]
      after:px-[var(--x)] after:py-[var(--xxx)]
      after:fixed after:z-[999]
      after:whitespace-nowrap
      after:text-[var(--xx)]
      after:left-1/2 after:top-[20dvh]
      after:-translate-x-1/2
      after:transition-[opacity,visibility] after:duration-300
      after:shadow-[var(--box-shadow)]
      after:border-[var(--border)]
      after:font-[Medium,ui-sans-serif]
      hover:after:visible hover:after:opacity-100`
    : `after:content-[attr(data-title)]
      after:invisible after:opacity-0
      after:bg-surface after:text-text
      after:rounded-[var(--radius-l)]
      after:px-[var(--x)] after:py-[var(--xxx)]
      after:fixed after:z-[999]
      after:whitespace-nowrap
      after:text-[var(--xx)]
      after:left-1/2 after:top-[20dvh]
      after:-translate-x-1/2
      after:transition-[opacity,visibility] after:duration-300
      after:shadow-[var(--box-shadow)]
      after:border-[var(--border)]
      after:font-[Medium,ui-sans-serif]`

  const linkClass = `flex items-center gap-[var(--m)] h-max
    rounded-[var(--radius-m)] cursor-pointer box-border border border-transparent group
    hover:font-medium hover:bg-transbg`

  const linkPad = isSidebarCollapsed
    ? 'p-[var(--xxs)_0] justify-center hover:bg-transparent'
    : 'px-[var(--m)] py-[var(--xs)]'

  const toggleSublink = (text) => {
    setOpenSublinks(prev => ({ ...prev, [text]: !prev[text] }))
  }

  return (
    <aside className={`bg-sidebar fixed m-[var(--m)] p-[var(--m)] rounded-[var(--radius-m)]
                    box-border h-[97dvh] grid grid-cols-1 grid-rows-[max-content_1fr_max-content]
                    transition-all duration-300 z-[99] ${sidebarWidth} ${showSidebarClass}`}>

      {/* Header */}
      <div className="flex items-center gap-[var(--m)] border-b border-line pb-[var(--m)]">
        <div className="p-[var(--xxs)] bg-white rounded-full">
          <img className="max-w-[20px] max-h-[20px] min-w-[20px] min-h-[20px] object-contain" alt="logo" src={`${import.meta.env.BASE_URL}/iamra-logo.svg`} />
        </div>
        <div className={`font-bold text-[var(--l)] ${isSidebarCollapsed ? 'hidden' : ''}`}>Iamra</div>
      </div>

      {/* Nav Items */}
      <div className="h-[95%] overflow-y-auto overflow-x-hidden pr-[var(--xxs)]
                    my-[var(--m)] box-border [&::-webkit-scrollbar]:w-[7px_!important]
                    grid grid-cols-1 gap-[var(--xxs)] auto-rows-max">

        {navItems.map(item => {
          if (item.type === 'link') {
            return (
              <HashLink
                key={item.text}
                to={item.to}
                className={`${linkClass} ${sidebarLinkActive(item.to)} ${sidebarTooltip} ${linkPad}`}
                data-title={item.text}
              >
                <svg className={`max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary ${sidebarLinkActiveSvg(item.to)}`}>
                  <use href={`${import.meta.env.BASE_URL}/sprite.svg#${item.svg}`} />
                </svg>
                <span className={`group-hover:text-secondary ${isSidebarCollapsed ? 'hidden' : ''}`}>{item.text}</span>
              </HashLink>
            )
          }

          if (item.type === 'sublinks') {
            const isOpen = openSublinks[item.text] ?? isSublinksActive(item.links)
            return (
              <div key={item.text} className={`rounded-[var(--radius-m)] ${isOpen ? 'bg-sidebar-hover' : ''}`}>
                <div
                  className={`${linkClass} ${sidebarLinkActive(item.to)} ${sidebarTooltip} ${linkPad}`}
                  data-title={item.text}
                  onClick={() => toggleSublink(item.text)}
                >
                  <svg className={`max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary ${sidebarLinkActiveSvg(item.to)}`}>
                    <use href={`${import.meta.env.BASE_URL}/sprite.svg#${item.svg}`} />
                  </svg>
                  <span className={`group-hover:text-secondary ${isSidebarCollapsed ? 'hidden' : ''}`}>{item.text}</span>
                </div>

                {isOpen && (
                  <div>
                    {item.links.map(child => (
                      <HashLink
                        key={child.to}
                        to={child.to}
                        className={`${linkClass} ${sidebarLinkActive(child.to)} ${sidebarTooltip} ${isSidebarCollapsed ? 'p-[var(--xxs)_0] justify-center hover:bg-transparent' : 'px-[var(--m)] py-[var(--xs)] pl-[calc(var(--l)*2+var(--s))]'}`}
                        data-title={child.text}
                      >
                        <svg className={`max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary ${sidebarLinkActiveSvg(item.to)}`}>
                          <use href={`${import.meta.env.BASE_URL}/sprite.svg#${child.svg}`} />
                        </svg>
                        <span className={`group-hover:text-secondary ${isSidebarCollapsed ? 'hidden' : ''}`}>{child.text}</span>
                      </HashLink>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return null
        })}
      </div>

      {/* Toggle Button */}
        <div className={`${linkClass} px-[var(--m)] py-[var(--xs)]`} onClick={onToggle}>
            <svg className="max-w-[var(--l)] max-h-[var(--l)] fill-scrollthumb group-hover:fill-secondary" xmlns="http://www.w3.org/2000/svg" width="35.52" height="35.52"
                 viewBox="0 0 20 20" shapeRendering="geometricPrecision" imageRendering="optimizeQuality"
                 fillRule="evenodd">
                <path d="M10 0h9s1 1 1 2v17l-1 1h-9l-1-1V2c0-1 1-2 1-2zm8 14v2 1h-1l-2-1v-1l2-1c0-1 0-1 1-1v1z"/>
                <rect width="7.211" height="20.232" rx="2" ry="4"/>
            </svg>
            <span className={`group-hover:text-secondary ${isSidebarCollapsed ? 'hidden' : ''}`}>Hide</span>
        </div>

    </aside>
  )
}
