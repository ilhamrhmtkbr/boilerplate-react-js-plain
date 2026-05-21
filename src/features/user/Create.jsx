import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApi }   from '@/hooks/useApi.js'
import { useToast } from '@/hooks/useToast.js'
import SectionTitle from '@/components/common/SectionTitle.jsx'
import Breadcrumb   from '@/components/common/Breadcrumb.jsx'
import Button       from '@/components/common/Button.jsx'
import CardWrapper  from '@/components/common/CardWrapper.jsx'
import FormField    from '@/components/common/FormField.jsx'

const ROLE_OPTIONS = [
  { label: 'Admin',     value: 'admin' },
  { label: 'User',      value: 'user' },
  { label: 'Moderator', value: 'moderator' },
]

const STATUS_OPTIONS = [
  { label: 'Aktif',    value: 'active' },
  { label: 'Nonaktif', value: 'inactive' },
]

const schema = yup.object({
  name:     yup.string().required('Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email:    yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  password: yup.string().required('Password wajib diisi').min(8, 'Minimal 8 karakter'),
  role:     yup.string().required('Role wajib dipilih'),
  status:   yup.string().required('Status wajib dipilih'),
})

export default function UserCreate() {
  const navigate          = useNavigate()
  const { post, loading } = useApi()
  const { showToast }     = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  async function onSubmit(values) {
    try {
      await post('/users', values)
      showToast('User berhasil ditambahkan!', 'success')
      navigate('/admin/user')
    } catch {
      showToast('Gagal menyimpan data user', 'danger')
    }
  }

  return (
    <div className="grid gap-[var(--m)]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-[var(--m)]">
        <div>
          <SectionTitle text="Tambah User" />
          <Breadcrumb />
        </div>
        <Button text="← Kembali" variant="primary" type="outline" onClick={() => navigate(-1)} />
      </div>

      {/* Form Card */}
      <CardWrapper replaceShadowWithBorder>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[var(--m)]">

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
            <FormField {...register('name')}     id="name"     label="Nama Lengkap"                  error={errors.name?.message} />
            <FormField {...register('email')}    id="email"    label="Email" type="email"             error={errors.email?.message} />
            <FormField {...register('password')} id="password" label="Password" type="password" placeholder="Min. 8 karakter" error={errors.password?.message} />
            <FormField {...register('role')}     id="role"     label="Role" type="select"             options={ROLE_OPTIONS}   error={errors.role?.message} />
            <FormField {...register('status')}   id="status"   label="Status" type="select"           options={STATUS_OPTIONS} error={errors.status?.message} />
          </div>

          <div className="flex items-center justify-end gap-[var(--m)] mt-[var(--m)]">
            <Button text="Batal"  variant="danger"  type="outline" onClick={() => navigate(-1)} />
            <Button text="Simpan" variant="primary" loading={loading} buttonType="submit" />
          </div>

        </form>
      </CardWrapper>

    </div>
  )
}
