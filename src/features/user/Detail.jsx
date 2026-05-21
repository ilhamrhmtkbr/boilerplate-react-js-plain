import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi }   from '@/hooks/useApi.js'
import { useToast } from '@/hooks/useToast.js'
import SectionTitle from '@/components/common/SectionTitle.jsx'
import Breadcrumb   from '@/components/common/Breadcrumb.jsx'
import Button       from '@/components/common/Button.jsx'
import CardWrapper  from '@/components/common/CardWrapper.jsx'
import LoadingPulse from '@/components/common/LoadingPulse.jsx'
import Timeline     from '@/components/common/Timeline.jsx'

export default function UserDetail() {
  const { id }               = useParams()
  const navigate             = useNavigate()
  const { get, loading }     = useApi()
  const { showToast }        = useToast()

  const [user, setUser]       = useState(null)

  // Contoh timeline aktivitas — sesuaikan dengan data dari API
  const [activityLog] = useState([
    { title: 'Akun Dibuat',      desc: 'Akun berhasil didaftarkan ke sistem.',  time: '10 Jan 2025', active: true  },
    { title: 'Login Pertama',    desc: 'Pengguna pertama kali masuk ke sistem.', time: '10 Jan 2025', active: true  },
    { title: 'Profile Diupdate', desc: 'Nama dan nomor telepon diperbarui.',     time: '15 Feb 2025', active: false },
    { title: 'Password Diubah',  desc: 'Password berhasil diganti.',             time: '20 Mar 2025', active: false },
  ])

  async function fetchUser() {
    try {
      // const res = await get(`/users/${id}`)
      // setUser(res.data.data)

      // Mock — hapus setelah API siap
      setUser({
        id,
        name:       'Budi Santoso',
        email:      'budi@mail.com',
        role:       'user',
        status:     'active',
        created_at: '10 Januari 2025',
      })
    } catch {
      showToast('Gagal memuat detail user', 'danger')
      navigate('/admin/user')
    }
  }

  useEffect(() => { fetchUser() }, [id])

  const infoRows = user ? [
    { label: 'Nama',      value: user.name },
    { label: 'Email',     value: user.email },
    { label: 'Role',      value: user.role },
    { label: 'Bergabung', value: user.created_at },
  ] : []

  return (
    <div className="grid gap-[var(--m)]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-[var(--m)]">
        <div>
          <SectionTitle text="Detail User" />
          <Breadcrumb />
        </div>
        <div className="flex items-center gap-[var(--m)]">
          <Button text="← Kembali" variant="primary" type="outline" onClick={() => navigate(-1)} />
          <Button text="Edit"      variant="warning"               onClick={() => navigate(`/admin/user/${id}/edit`)} />
        </div>
      </div>

      {loading ? (
        <LoadingPulse height="300px" />
      ) : user ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[var(--m)]">

          {/* Info Card */}
          <CardWrapper replaceShadowWithBorder>
            <h2 className="font-bold text-[length:var(--l)] text-text mb-[var(--m)]">Informasi User</h2>

            <div className="grid gap-[var(--s)]">
              {infoRows.map((row, i) => (
                <div key={i} className="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line last:border-none last:pb-0">
                  <span className="text-link text-[length:var(--s)] min-w-[100px] shrink-0">{row.label}</span>
                  <span className="font-medium text-text capitalize">{row.value}</span>
                </div>
              ))}

              {/* Status khusus karena pakai badge */}
              <div className="flex items-center gap-[var(--m)]">
                <span className="text-link text-[length:var(--s)] min-w-[100px] shrink-0">Status</span>
                <span className={`px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium ${
                  user.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
                }`}>
                  {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
              </div>
            </div>
          </CardWrapper>

          {/* Activity Timeline */}
          <CardWrapper replaceShadowWithBorder>
            <h2 className="font-bold text-[length:var(--l)] text-text mb-[var(--m)]">Riwayat Aktivitas</h2>
            <Timeline items={activityLog} />
          </CardWrapper>

        </div>
      ) : null}

    </div>
  )
}
