/**
 * useConfirm.js — Promise-based confirm dialog (singleton)
 *
 * Tambahkan ConfirmDialog di App.jsx atau AppLayout.jsx:
 *
 *   import { useConfirm } from '@/hooks/useConfirm.js'
 *   const { confirm, onConfirm, onCancel } = useConfirm()
 *
 *   <Modal isOpen={confirm.show} title={confirm.title} onClose={onCancel}>
 *     <p className="text-text">{confirm.message}</p>
 *     <div slot="footer" className="flex gap-[var(--m)] justify-center">
 *       <Button text="Batal"        variant="danger"  type="outline" onClick={onCancel} />
 *       <Button text="Ya, Lanjutkan" variant="primary"               onClick={onConfirm} />
 *     </div>
 *   </Modal>
 *
 * Usage di komponen manapun:
 *   const { showConfirm } = useConfirm()
 *   const ok = await showConfirm('Hapus Data', 'Yakin ingin menghapus data ini?')
 *   if (ok) { ... lanjutkan hapus ... }
 */

import { useState, useEffect } from 'react'

// ── Module-level singleton state ──────────────────────────────────────
let _confirm = {
  show:    false,
  title:   '',
  message: '',
  resolve: null,
}
const _subscribers = new Set()

function _notify() {
  _subscribers.forEach(fn => fn())
}

export function useConfirm() {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const rerender = () => forceUpdate(n => n + 1)
    _subscribers.add(rerender)
    return () => _subscribers.delete(rerender)
  }, [])

  function showConfirm(title, message) {
    return new Promise((resolve) => {
      _confirm = { show: true, title, message, resolve }
      _notify()
    })
  }

  function onConfirm() {
    _confirm.resolve?.(true)
    _confirm = { ..._confirm, show: false }
    _notify()
  }

  function onCancel() {
    _confirm.resolve?.(false)
    _confirm = { ..._confirm, show: false }
    _notify()
  }

  return { confirm: _confirm, showConfirm, onConfirm, onCancel }
}
