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

const CATEGORY_OPTIONS = [
  { label: 'Elektronik', value: 'elektronik' },
  { label: 'Fashion',    value: 'fashion' },
  { label: 'Makanan',    value: 'makanan' },
  { label: 'Lainnya',    value: 'lainnya' },
]

const STATUS_OPTIONS = [
  { label: 'Aktif',    value: 'active' },
  { label: 'Nonaktif', value: 'inactive' },
]

const schema = yup.object({
  name:        yup.string().required('Nama produk wajib diisi'),
  description: yup.string().required('Deskripsi wajib diisi'),
  price:       yup.number().required('Harga wajib diisi').min(0, 'Harga tidak boleh negatif').typeError('Harus berupa angka'),
  stock:       yup.number().required('Stok wajib diisi').min(0, 'Stok tidak boleh negatif').typeError('Harus berupa angka'),
  category:    yup.string().required('Kategori wajib dipilih'),
  status:      yup.string().required('Status wajib dipilih'),
})

export default function ProductCreate() {
  const navigate          = useNavigate()
  const { post, loading } = useApi()
  const { showToast }     = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  async function onSubmit(values) {
    try {
      await post('/products', values)
      showToast('Produk berhasil ditambahkan!', 'success')
      navigate('/admin/product')
    } catch {
      showToast('Gagal menyimpan produk', 'danger')
    }
  }

  return (
    <div className="grid gap-[var(--m)]">

      <div className="flex flex-wrap items-center justify-between gap-[var(--m)]">
        <div>
          <SectionTitle text="Tambah Produk" />
          <Breadcrumb />
        </div>
        <Button text="← Kembali" variant="primary" type="outline" onClick={() => navigate(-1)} />
      </div>

      <CardWrapper replaceShadowWithBorder>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-[var(--m)]">

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[var(--m)]">
            <FormField {...register('name')}     id="name"     label="Nama Produk"                     error={errors.name?.message} />
            <FormField {...register('price')}    id="price"    label="Harga (Rp)" type="number" placeholder="0" error={errors.price?.message} />
            <FormField {...register('stock')}    id="stock"    label="Stok" type="number"       placeholder="0" error={errors.stock?.message} />
            <FormField {...register('category')} id="category" label="Kategori" type="select"   options={CATEGORY_OPTIONS} error={errors.category?.message} />
            <FormField {...register('status')}   id="status"   label="Status" type="select"     options={STATUS_OPTIONS}   error={errors.status?.message} />
          </div>

          {/* Deskripsi full width */}
          <FormField
            {...register('description')}
            id="description"
            label="Deskripsi"
            type="textarea"
            rows={4}
            placeholder="Tuliskan deskripsi produk..."
            error={errors.description?.message}
          />

          <div className="flex items-center justify-end gap-[var(--m)] mt-[var(--m)]">
            <Button text="Batal"  variant="danger"  type="outline" onClick={() => navigate(-1)} />
            <Button text="Simpan" variant="primary" loading={loading} buttonType="submit" />
          </div>

        </form>
      </CardWrapper>

    </div>
  )
}
