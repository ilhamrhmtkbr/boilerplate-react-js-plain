// src/hooks/useAuth.js
//
// Singleton state menggunakan module-level variable + subscriber pattern
// (mirip Vue singleton ref, tanpa perlu Context Provider)

import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from './useApi.js'

// ── Module-level singleton state ──────────────────────────────────────
let _user            = null
let _isAuthenticated = false
let _sessionChecked  = false
let _isChecking      = false
const _subscribers   = new Set()

function _notify() {
  _subscribers.forEach(fn => fn())
}

// ── Hook ──────────────────────────────────────────────────────────────
export function useAuth() {
  const [, forceUpdate]           = useState(0)
  const navigate                  = useNavigate()
  const { post, get, loading, error } = useApi()

  // Subscribe agar komponen re-render saat state berubah
  useEffect(() => {
    const rerender = () => forceUpdate(n => n + 1)
    _subscribers.add(rerender)
    return () => _subscribers.delete(rerender)
  }, [])

  // Dipanggil sekali di AppLayout atau router guard
  const checkSession = useCallback(async () => {
    if (_sessionChecked || _isChecking) return
    _isChecking = true
    _notify()
    try {
      const res         = await get('/auth/me')
      _user             = res.data.user
      _isAuthenticated  = true
      _sessionChecked   = true
    } catch {
      // Cookie tidak ada / expired → state tetap false
      _user            = null
      _isAuthenticated = false
      _sessionChecked  = true
    } finally {
      _isChecking = false
      _notify()
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const res        = await post('/auth/login', credentials)
    // Backend set httpOnly cookie via Set-Cookie, kita tidak pegang tokennya
    _user            = res.data.user
    _isAuthenticated = true
    _notify()
    navigate('/admin/dashboard')
    return res
  }, [navigate])

  const register = useCallback(async (data) => {
    return await post('/auth/register', data)
  }, [])

  const forgotPassword = useCallback(async (email) => {
    return await post('/auth/forgot-password', { email })
  }, [])

  const logout = useCallback(async () => {
    try {
      await post('/auth/logout') // backend hapus cookie / blacklist token
    } finally {
      _user            = null
      _isAuthenticated = false
      _sessionChecked  = false
      _notify()
      navigate('/auth/login')
    }
  }, [navigate])

  return {
    user:            _user,
    isAuthenticated: _isAuthenticated,
    isChecking:      _isChecking,
    loading,
    error,
    checkSession,
    login,
    register,
    logout,
    forgotPassword,
  }
}
