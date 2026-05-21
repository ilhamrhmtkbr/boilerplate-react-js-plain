import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth.js'
import { useToast } from '@/hooks/useToast.js'
import FormField from '@/components/common/FormField.jsx'

const schema = yup.object({
  email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
})

export default function ForgotPassword() {
  const { forgotPassword, loading } = useAuth()
  const { showToast }               = useToast()
  const [sent, setSent]             = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  async function onSubmit(values) {
    try {
      await forgotPassword(values.email)
      setSent(true)
    } catch {
      showToast('Gagal mengirim email. Coba lagi.', 'danger')
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg p-[var(--m)]">
      <div className="w-full max-w-[400px] grid gap-[var(--l)]
                      p-[var(--xxx)] bg-surface rounded-[var(--radius-m)]
                      border border-line shadow-[var(--box-shadow)]">

        {/* State: Email Terkirim */}
        {sent ? (
          <div className="text-center grid gap-[var(--m)]">
            <div className="text-[48px] mx-auto">📧</div>
            <h1 className="text-[length:var(--x)] font-bold text-text">Email Terkirim!</h1>
            <p className="text-link text-[length:var(--s)]">
              Cek inbox kamu dan ikuti link reset password yang kami kirimkan.
            </p>
            <Link to="/auth/login" className="text-primary text-[length:var(--s)] hover:underline font-medium">
              ← Kembali ke Login
            </Link>
          </div>
        ) : (
          <>
            {/* State: Form */}
            <div className="grid gap-[var(--xxs)]">
              <h1 className="text-[length:var(--xx)] font-bold text-text">Lupa Password?</h1>
              <p className="text-link text-[length:var(--s)]">
                Masukkan email dan kami akan kirimkan link reset password.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[var(--m)]">
              <FormField
                {...register('email')}
                id="email"
                label="Email"
                type="email"
                placeholder="contoh@email.com"
                error={errors.email?.message}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-[calc(var(--m)/2)] px-[var(--m)]
                           bg-primary text-bg rounded-[var(--radius-s)]
                           font-medium transition-all
                           hover:ring-4 hover:ring-transprimary
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                            stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                )}
                <span>{loading ? 'Mengirim...' : 'Kirim Link Reset'}</span>
              </button>
            </form>

            <p className="text-center text-[length:var(--s)] text-link">
              Ingat password?{' '}
              <Link to="/auth/login" className="text-primary hover:underline font-medium">
                Kembali Login
              </Link>
            </p>
          </>
        )}

      </div>
    </div>
  )
}
