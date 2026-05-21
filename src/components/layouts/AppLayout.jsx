import { useState, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import ContentHeader from './components/ContentHeader'
import Sidebar from './components/Sidebar'
import ContentFooter from './components/ContentFooter'
import ContentSection from './components/ContentSection'

export default function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)

  const containerPadLeft = useMemo(() => {
    if (showSidebar) {
      if (isSidebarCollapsed) {
        return 'p-[var(--m)_var(--m)_var(--m)_calc(var(--width-sidebar-collapse)+var(--m)*2)]'
      } else {
        return 'pl-[calc(var(--width-sidebar-expanded)+var(--m)*2)] max-[800px]:pl-[var(--m)]'
      }
    } else {
      return 'pl-[var(--m)]'
    }
  }, [showSidebar, isSidebarCollapsed])

  return (
    <>
      <BottomNav />
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(v => !v)}
        showSidebar={showSidebar}
      />
      <main className={`transition-all duration-300 w-full max-w-[1920px] box-border
                min-h-[100dvh] mx-auto pr-[var(--m)] pt-[var(--m)] pb-[var(--m)] ${containerPadLeft}`}>
        <ContentHeader onToggleShow={() => setShowSidebar(v => !v)} />
        <ContentSection>
          <Outlet />
        </ContentSection>
        <ContentFooter />
      </main>
    </>
  )
}
