import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApi }   from '@/hooks/useApi.js'
import { useToast } from '@/hooks/useToast.js'
import { useAuth }  from '@/hooks/useAuth.js'
import SectionTitle from '@/components/common/SectionTitle.jsx'
import CardWrapper  from '@/components/common/CardWrapper.jsx'
import Button       from '@/components/common/Button.jsx'
import FormField    from '@/components/common/FormField.jsx'

const schema = yup.object({
  name:  yup.string().required('Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  password: yup.string().test('min-jika-diisi', 'Minimal 8 karakter', (val) => !val || val.length >= 8),
  password_confirmation: yup.string().test('cocok', 'Password tidak cocok', function (val) {
    return !this.parent.password || val === this.parent.password
  }),
})

export default function Profile() {
  const { get, put, loading } = useApi()
  const { showToast }         = useToast()
  const { user: authUser }    = useAuth()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  async function fetchProfile() {
    try {
      // const res = await get('/profile')
      // reset({ ...res.data, password: '', password_confirmation: '' })

      // Mock — hapus setelah API siap
      reset({
        name:                  authUser?.name  ?? 'Budi Santoso',
        email:                 authUser?.email ?? 'budi@mail.com',
        password:              '',
        password_confirmation: '',
      })
    } catch {
      showToast('Gagal memuat profile', 'danger')
    }
  }

  async function onSubmit(values) {
    if (!values.password) {
      delete values.password
      delete values.password_confirmation
    }
    try {
      await put('/profile', values)
      showToast('Profile berhasil diperbarui!', 'success')
    } catch {
      showToast('Gagal memperbarui profile', 'danger')
    }
  }

  useEffect(() => { fetchProfile() }, [])

  return (
    <div className="grid gap-[var(--m)]">

      <SectionTitle text="Profile Saya" />

      <CardWrapper replaceShadowWithBorder>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[var(--m)]">

          {/* Info Akun */}
          <div>
            <h2 className="font-bold text-[length:var(--l)] text-text mb-[var(--m)]">Informasi Akun</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
              <FormField {...register('name')}  id="name"  label="Nama Lengkap" error={errors.name?.message} />
              <FormField {...register('email')} id="email" label="Email" type="email" error={errors.email?.message} />
            </div>
          </div>

          {/* Ubah Password */}
          <div>
            <h2 className="font-bold text-[length:var(--l)] text-text mb-[var(--xxs)]">Ubah Password</h2>
            <p className="text-link text-[length:var(--s)] mb-[var(--m)]">Kosongkan jika tidak ingin mengubah password</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
              <FormField {...register('password')}              id="password"              label="Password Baru" type="password" placeholder="Min. 8 karakter" error={errors.password?.message} />
              <FormField {...register('password_confirmation')} id="password_confirmation" label="Konfirmasi Password Baru" type="password" error={errors.password_confirmation?.message} />
            </div>
          </div>

          <div className="flex justify-end mt-[var(--m)]">
            <Button text="Simpan Perubahan" variant="primary" loading={loading} buttonType="submit" />
          </div>

        </form>
      </CardWrapper>

    </div>
  )
}
