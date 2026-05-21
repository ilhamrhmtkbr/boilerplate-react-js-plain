import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth.js'
import { useToast } from '@/hooks/useToast.js'
import FormField from '@/components/common/FormField.jsx'

const schema = yup.object({
  name:                  yup.string().required('Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email:                 yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  password:              yup.string().required('Password wajib diisi').min(8, 'Minimal 8 karakter'),
  password_confirmation: yup.string()
    .required('Konfirmasi password wajib diisi')
    .oneOf([yup.ref('password')], 'Password tidak cocok'),
})

export default function Register() {
  const navigate                  = useNavigate()
  const { register: registerUser, loading } = useAuth()
  const { showToast }             = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  async function onSubmit(values) {
    try {
      await registerUser(values)
      showToast('Registrasi berhasil! Silakan login.', 'success')
      navigate('/auth/login')
    } catch {
      showToast('Registrasi gagal, silakan coba lagi.', 'danger')
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-bg p-[var(--m)]">
      <div className="w-full max-w-[450px] grid gap-[var(--l)]
                      p-[var(--xxx)] bg-surface rounded-[var(--radius-m)]
                      border border-line shadow-[var(--box-shadow)]">

        {/* Header */}
        <div className="grid gap-[var(--xxs)]">
          <h1 className="text-[length:var(--xx)] font-bold text-text">Buat Akun ✨</h1>
          <p className="text-link text-[length:var(--s)]">Isi data di bawah untuk mendaftar</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[var(--m)]">
          <FormField {...register('name')}                  id="name"                  label="Nama Lengkap"             error={errors.name?.message} />
          <FormField {...register('email')}                 id="email"                 label="Email" type="email" placeholder="contoh@email.com" error={errors.email?.message} />
          <FormField {...register('password')}              id="password"              label="Password" type="password" placeholder="Min. 8 karakter" error={errors.password?.message} />
          <FormField {...register('password_confirmation')} id="password_confirmation" label="Konfirmasi Password" type="password" error={errors.password_confirmation?.message} />

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
            <span>{loading ? 'Mendaftar...' : 'Daftar'}</span>
          </button>
        </form>

        <p className="text-center text-[length:var(--s)] text-link">
          Sudah punya akun?{' '}
          <Link to="/auth/login" className="text-primary hover:underline font-medium">
            Masuk
          </Link>
        </p>

      </div>
    </div>
  )
}
