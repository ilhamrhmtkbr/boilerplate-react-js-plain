/**
 * navigation.js — Konfigurasi item navigasi untuk Sidebar & BottomNav
 *
 * CARA PAKAI DI AppLayout.jsx:
 *
 *   import { NAV_ITEMS } from '@/config/navigation.js'
 *
 *   Di JSX, pass ke Sidebar:
 *   <Sidebar navItems={NAV_ITEMS} isSidebarCollapsed={...} onToggle={...} showSidebar={...} />
 *
 * Catatan: svg ID harus ada di /public/sprite.svg
 *          Ganti dengan icon yang sesuai dengan sprite kamu
 */

export const NAV_ITEMS = [
  {
    type: 'link',
    to:   '/admin/dashboard',
    svg:  'dashboard',
    text: 'Dashboard',
  },
  {
    type: 'sublinks',
    svg:  'users',
    text: 'User',
    links: [
      { to: '/admin/user',    svg: 'list',    text: 'Daftar User' },
      { to: '/admin/profile', svg: 'profile', text: 'Profile Saya' },
    ],
  },
  {
    type: 'sublinks',
    svg:  'box',
    text: 'Produk',
    links: [
      { to: '/admin/product', svg: 'list', text: 'Daftar Produk' },
    ],
  },
]
