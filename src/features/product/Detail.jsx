import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi }   from '@/hooks/useApi.js'
import { useToast } from '@/hooks/useToast.js'
import SectionTitle from '@/components/common/SectionTitle.jsx'
import Breadcrumb   from '@/components/common/Breadcrumb.jsx'
import Button       from '@/components/common/Button.jsx'
import CardWrapper  from '@/components/common/CardWrapper.jsx'
import LoadingPulse from '@/components/common/LoadingPulse.jsx'

function formatPrice(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(val)
}

export default function ProductDetail() {
  const { id }               = useParams()
  const navigate             = useNavigate()
  const { get, loading }     = useApi()
  const { showToast }        = useToast()

  const [product, setProduct] = useState(null)

  async function fetchProduct() {
    try {
      // const res = await get(`/products/${id}`)
      // setProduct(res.data.data)

      // Mock — hapus setelah API siap
      setProduct({
        id,
        name:        'Laptop Pro X',
        description: 'Laptop gaming terbaik dengan performa tinggi. Cocok untuk desainer, developer, dan gamer.',
        price:       15000000,
        stock:       10,
        category:    'Elektronik',
        status:      'active',
        created_at:  '5 Januari 2025',
      })
    } catch {
      showToast('Gagal memuat detail produk', 'danger')
      navigate('/admin/product')
    }
  }

  useEffect(() => { fetchProduct() }, [id])

  return (
    <div className="grid gap-[var(--m)]">

      <div className="flex flex-wrap items-center justify-between gap-[var(--m)]">
        <div>
          <SectionTitle text="Detail Produk" />
          <Breadcrumb />
        </div>
        <div className="flex items-center gap-[var(--m)]">
          <Button text="← Kembali" variant="primary" type="outline" onClick={() => navigate(-1)} />
          <Button text="Edit"      variant="warning"               onClick={() => navigate(`/admin/product/${id}/edit`)} />
        </div>
      </div>

      {loading ? (
        <LoadingPulse height="300px" />
      ) : product ? (
        <CardWrapper replaceShadowWithBorder>
          <h2 className="font-bold text-[length:var(--x)] text-text mb-[var(--m)]">{product.name}</h2>

          <div className="grid gap-[var(--s)]">
            <div className="flex items-start gap-[var(--m)] pb-[var(--s)] border-b border-line">
              <span className="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Deskripsi</span>
              <span className="text-text leading-relaxed">{product.description}</span>
            </div>
            <div className="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
              <span className="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Harga</span>
              <span className="font-bold text-text text-[length:var(--l)]">{formatPrice(product.price)}</span>
            </div>
            <div className="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
              <span className="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Stok</span>
              <span className={product.stock === 0 ? 'text-danger font-medium' : 'text-text'}>
                {product.stock === 0 ? 'Habis' : `${product.stock} unit`}
              </span>
            </div>
            <div className="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
              <span className="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Kategori</span>
              <span className="text-text">{product.category}</span>
            </div>
            <div className="flex items-center gap-[var(--m)] pb-[var(--s)] border-b border-line">
              <span className="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Status</span>
              <span className={`px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium ${
                product.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
              }`}>
                {product.status === 'active' ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <div className="flex items-center gap-[var(--m)]">
              <span className="text-link text-[length:var(--s)] min-w-[110px] shrink-0">Ditambahkan</span>
              <span className="text-text">{product.created_at}</span>
            </div>
          </div>
        </CardWrapper>
      ) : null}

    </div>
  )
}
