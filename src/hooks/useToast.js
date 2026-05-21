/**
 * useToast.js — Global toast notification (singleton)
 *
 * Tambahkan komponen Toast di AppLayout.jsx atau App.jsx:
 *
 *   import { useToast } from '@/hooks/useToast.js'
 *   const { toast, hideToast } = useToast()
 *
 *   <Toast
 *     show={toast.show}
 *     message={toast.message}
 *     type={toast.type}
 *     onClose={hideToast}
 *   />
 *
 * Usage di komponen manapun:
 *   const { showToast } = useToast()
 *   showToast('Berhasil disimpan!', 'success')
 *   showToast('Gagal!', 'danger')
 *   showToast('Perhatian!', 'warning')
 */

import { useState, useEffect } from 'react'

// ── Module-level singleton state ──────────────────────────────────────
let _toast = {
  show:    false,
  message: '',
  type:    'primary', // primary | success | danger | warning
}
let _timer       = null
const _subscribers = new Set()

function _notify() {
  _subscribers.forEach(fn => fn())
}

export function useToast() {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const rerender = () => forceUpdate(n => n + 1)
    _subscribers.add(rerender)
    return () => _subscribers.delete(rerender)
  }, [])

  function showToast(message, type = 'primary', duration = 3000) {
    if (_timer) clearTimeout(_timer)
    _toast = { show: true, message, type }
    _notify()
    _timer = setTimeout(hideToast, duration)
  }

  function hideToast() {
    _toast = { ..._toast, show: false }
    _notify()
  }

  return { toast: _toast, showToast, hideToast }
}
