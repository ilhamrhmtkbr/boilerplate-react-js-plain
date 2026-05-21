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

const CATEGORY_OPTIONS = [
  { label: 'Elektronik', value: 'elektronik' },
  { label: 'Fashion',    value: 'fashion' },
  { label: 'Makanan',    value: 'makanan' },
  { label: 'Lainnya',    value: 'lainnya' },
]

function formatPrice(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(val)
}

export default function ProductIndex() {
  const navigate                                            = useNavigate()
  const { get, del, loading }                               = useApi()
  const { showToast }                                       = useToast()
  const { showConfirm }                                     = useConfirm()
  const { currentPage, setCurrentPage, perPage, setPerPage, totalPages, setTotal, reset } = usePagination()

  const [products, setProducts]           = useState([])
  const [search, setSearch]               = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  async function fetchProducts() {
    // TODO: Uncomment saat API siap
    // try {
    //   const res = await get('/products', {
    //     page:     currentPage,
    //     per_page: perPage,
    //     search,
    //     category: categoryFilter,
    //   })
    //   setProducts(res.data.data)
    //   setTotal(res.data.meta.total)
    // } catch {
    //   showToast('Gagal memuat data produk', 'danger')
    // }

    // Mock Data — hapus setelah API siap
    const mockProducts = [
      { id: 1, name: 'Laptop Pro X',   category: 'elektronik', price: 15000000, stock: 10, status: 'active' },
      { id: 2, name: 'Kemeja Batik',   category: 'fashion',    price:   250000, stock: 50, status: 'active' },
      { id: 3, name: 'Kopi Arabika',   category: 'makanan',    price:    75000, stock: 0,  status: 'inactive' },
      { id: 4, name: 'Smartwatch Z2',  category: 'elektronik', price:  1500000, stock: 25, status: 'active' },
      { id: 5, name: 'Tas Kulit Sapi', category: 'fashion',    price:   800000, stock: 15, status: 'active' },
    ]
    setProducts(mockProducts)
    setTotal(mockProducts.length)
  }

  async function handleDelete(id) {
    const ok = await showConfirm('Hapus Produk', 'Yakin ingin menghapus produk ini?')
    if (!ok) return
    try {
      // await del(`/products/${id}`)
      showToast('Produk berhasil dihapus', 'success')
      fetchProducts()
    } catch {
      showToast('Gagal menghapus produk', 'danger')
    }
  }

  function handleSearch() {
    reset()
    fetchProducts()
  }

  function onPageChange(page) {
    setCurrentPage(page)
    fetchProducts()
  }

  function onPerPageChange(pp) {
    setPerPage(pp)
    reset()
    fetchProducts()
  }

  useEffect(() => { fetchProducts() }, [])

  return (
    <div className="grid gap-[var(--m)]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-[var(--m)]">
        <div>
          <SectionTitle text="Manajemen Produk" />
          <Breadcrumb />
        </div>
        <Button text="+ Tambah Produk" variant="primary" onClick={() => navigate('/admin/product/create')} />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-[var(--m)]">
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
            placeholder="Cari nama produk..."
            className="outline-none border-none bg-transparent text-text
                       placeholder:text-link text-[length:var(--s)] w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <Filter
          title="Filter Kategori"
          filters={CATEGORY_OPTIONS}
          value={categoryFilter}
          onUpdateValue={(val) => { setCategoryFilter(val); handleSearch() }}
        />

        {(search || categoryFilter) && (
          <Button
            text="Reset Filter"
            variant="danger"
            type="outline"
            onClick={() => { setSearch(''); setCategoryFilter(''); handleSearch() }}
          />
        )}
      </div>

      {/* Table Card */}
      <CardWrapper replaceShadowWithBorder>
        {loading ? (
          <LoadingPulse height="300px" />
        ) : !products.length ? (
          <NoData />
        ) : (
          <>
            <Table headers={['No', 'Nama Produk', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi']}>
              {products.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center px-[var(--xs)] py-[var(--s)]">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td className="px-[var(--xs)] py-[var(--s)] font-medium min-w-[150px]">{item.name}</td>
                  <td className="px-[var(--xs)] py-[var(--s)] capitalize">{item.category}</td>
                  <td className="px-[var(--xs)] py-[var(--s)]">{formatPrice(item.price)}</td>
                  <td className="text-center px-[var(--xs)] py-[var(--s)]">
                    <span className={item.stock === 0 ? 'text-danger font-medium' : 'text-text'}>
                      {item.stock === 0 ? 'Habis' : item.stock}
                    </span>
                  </td>
                  <td className="px-[var(--xs)] py-[var(--s)]">
                    <span className={`px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium ${
                      item.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
                    }`}>
                      {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="action px-[var(--xs)] py-[var(--s)]">
                    <div className="flex items-center gap-[var(--m)] text-[length:var(--s)]">
                      <Link to={`/admin/product/${item.id}`}      className="text-primary hover:underline">Detail</Link>
                      <Link to={`/admin/product/${item.id}/edit`} className="text-warning hover:underline">Edit</Link>
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
