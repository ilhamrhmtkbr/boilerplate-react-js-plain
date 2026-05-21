import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApi }        from '@/hooks/useApi.js'
import { useToast }      from '@/hooks/useToast.js'
import { useConfirm }    from '@/hooks/useConfirm.js'
import { usePagination } from '@/hooks/usePagination.js'
import SectionTitle  from '@/components/common/SectionTitle.jsx'
import Breadcrumb    from '@/components/common/Breadcrumb.jsx'
import Button        from '@/components/common/Button.jsx'
import Filter        from '@/components/common/Filter.jsx'
import CardWrapper   from '@/components/common/CardWrapper.jsx'
import LoadingPulse  from '@/components/common/LoadingPulse.jsx'
import NoData        from '@/components/common/NoData.jsx'
import Table         from '@/components/common/Table.jsx'
import Pagination    from '@/components/common/Pagination.jsx'

const ROLE_OPTIONS = [
  { label: 'Admin',     value: 'admin' },
  { label: 'User',      value: 'user' },
  { label: 'Moderator', value: 'moderator' },
]

export default function UserIndex() {
  const navigate                                           = useNavigate()
  const { get, del, loading }                              = useApi()
  const { showToast }                                      = useToast()
  const { showConfirm }                                    = useConfirm()
  const { currentPage, setCurrentPage, perPage, setPerPage, totalPages, setTotal, reset } = usePagination()

  const [users, setUsers]             = useState([])
  const [search, setSearch]           = useState('')
  const [roleFilter, setRoleFilter]   = useState('')

  // ── Fetch ────────────────────────────────────────────────────────
  async function fetchUsers() {
    // TODO: Uncomment saat API siap
    // try {
    //   const res = await get('/users', {
    //     page:     currentPage,
    //     per_page: perPage,
    //     search,
    //     role:     roleFilter,
    //   })
    //   setUsers(res.data.data)
    //   setTotal(res.data.meta.total)   // Laravel pagination
    // } catch {
    //   showToast('Gagal memuat data user', 'danger')
    // }

    // Mock Data — hapus setelah API siap
    const mockUsers = [
      { id: 1, name: 'Andi Wijaya',    email: 'andi@mail.com',   role: 'admin',     status: 'active' },
      { id: 2, name: 'Budi Santoso',   email: 'budi@mail.com',   role: 'user',      status: 'active' },
      { id: 3, name: 'Citra Dewi',     email: 'citra@mail.com',  role: 'moderator', status: 'inactive' },
      { id: 4, name: 'Doni Kurniawan', email: 'doni@mail.com',   role: 'user',      status: 'active' },
      { id: 5, name: 'Eka Putri',      email: 'eka@mail.com',    role: 'user',      status: 'active' },
    ]
    setUsers(mockUsers)
    setTotal(mockUsers.length)
  }

  async function handleDelete(id) {
    const ok = await showConfirm('Hapus User', 'Yakin ingin menghapus user ini? Tindakan tidak bisa dibatalkan.')
    if (!ok) return
    try {
      // await del(`/users/${id}`)
      showToast('User berhasil dihapus', 'success')
      fetchUsers()
    } catch {
      showToast('Gagal menghapus user', 'danger')
    }
  }

  function handleSearch() {
    reset()
    fetchUsers()
  }

  function onPageChange(page) {
    setCurrentPage(page)
    fetchUsers()
  }

  function onPerPageChange(pp) {
    setPerPage(pp)
    reset()
    fetchUsers()
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <div className="grid gap-[var(--m)]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-[var(--m)]">
        <div>
          <SectionTitle text="Manajemen User" />
          <Breadcrumb />
        </div>
        <Button text="+ Tambah User" variant="primary" onClick={() => navigate('/admin/user/create')} />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-[var(--m)]">

        {/* Search Input */}
        <div className="flex items-center gap-[var(--xxs)]
                        border border-line rounded-[var(--radius-s)]
                        px-[var(--xs)] py-[var(--xxs)] bg-surface
                        w-full max-w-[300px] focus-within:border-primary transition-colors">
          <svg className="max-w-[var(--m)] max-h-[var(--m)] shrink-0 fill-none stroke-link"
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="6"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Cari nama / email..."
            className="outline-none border-none bg-transparent text-text
                       placeholder:text-link text-[length:var(--s)] w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Filter Role */}
        <Filter
          title="Filter Role"
          filters={ROLE_OPTIONS}
          value={roleFilter}
          onUpdateValue={(val) => { setRoleFilter(val); handleSearch() }}
        />

        {/* Reset */}
        {(search || roleFilter) && (
          <Button
            text="Reset Filter"
            variant="danger"
            type="outline"
            onClick={() => { setSearch(''); setRoleFilter(''); handleSearch() }}
          />
        )}
      </div>

      {/* Table Card */}
      <CardWrapper replaceShadowWithBorder>
        {loading ? (
          <LoadingPulse height="300px" />
        ) : !users.length ? (
          <NoData />
        ) : (
          <>
            <Table headers={['No', 'Nama', 'Email', 'Role', 'Status', 'Aksi']}>
              {users.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center px-[var(--xs)] py-[var(--s)]">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td className="px-[var(--xs)] py-[var(--s)] font-medium whitespace-normal min-w-[150px]">
                    {item.name}
                  </td>
                  <td className="px-[var(--xs)] py-[var(--s)] text-link">{item.email}</td>
                  <td className="px-[var(--xs)] py-[var(--s)] capitalize">{item.role}</td>
                  <td className="px-[var(--xs)] py-[var(--s)]">
                    <span className={`px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium ${
                      item.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
                    }`}>
                      {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="action px-[var(--xs)] py-[var(--s)]">
                    <div className="flex items-center gap-[var(--m)] text-[length:var(--s)]">
                      <Link to={`/admin/user/${item.id}`}      className="text-primary hover:underline">Detail</Link>
                      <Link to={`/admin/user/${item.id}/edit`} className="text-warning hover:underline">Edit</Link>
                      <span className="text-danger cursor-pointer hover:underline" onClick={() => handleDelete(item.id)}>Hapus</span>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              perPage={perPage}
              onPageChange={onPageChange}
              onPerPageChange={onPerPageChange}
            />
          </>
        )}
      </CardWrapper>

    </div>
  )
}
