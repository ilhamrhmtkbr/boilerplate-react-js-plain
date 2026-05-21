import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '@/hooks/useApi.js'
import SectionTitle from '@/components/common/SectionTitle.jsx'
import CardWrapper  from '@/components/common/CardWrapper.jsx'
import ChartBar     from '@/components/common/ChartBar.jsx'
import ChartLine    from '@/components/common/ChartLine.jsx'
import Table        from '@/components/common/Table.jsx'

export default function Dashboard() {
  const { get } = useApi()

  // ── Stats Cards ──────────────────────────────────────────────────
  // TODO: Ganti mock data dengan API call
  const [stats] = useState([
    { label: 'Total User',    value: '1.240', icon: '👥', trend: '+12%', trendUp: true  },
    { label: 'User Aktif',    value: '987',   icon: '✅', trend: '+5%',  trendUp: true  },
    { label: 'Total Produk',  value: '342',   icon: '📦', trend: '+8%',  trendUp: true  },
    { label: 'Pending',       value: '23',    icon: '⏳', trend: '-2%',  trendUp: false },
  ])

  // ── Chart Data ───────────────────────────────────────────────────
  const [chartBarData] = useState([
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 700 },
    { label: 'Mar', value: 550 },
    { label: 'Apr', value: 900 },
    { label: 'Mei', value: 620 },
    { label: 'Jun', value: 850 },
  ])

  const [chartLineData] = useState([
    { label: 'Sen', value: 120 },
    { label: 'Sel', value: 380 },
    { label: 'Rab', value: 210 },
    { label: 'Kam', value: 540 },
    { label: 'Jum', value: 320 },
    { label: 'Sab', value: 750 },
    { label: 'Min', value: 490 },
  ])

  // ── Recent Users Table ────────────────────────────────────────────
  const [recentUsers] = useState([
    { name: 'Andi Wijaya',    email: 'andi@mail.com',  role: 'Admin', status: 'active' },
    { name: 'Budi Santoso',   email: 'budi@mail.com',  role: 'User',  status: 'active' },
    { name: 'Citra Dewi',     email: 'citra@mail.com', role: 'Mod',   status: 'inactive' },
    { name: 'Doni Kurniawan', email: 'doni@mail.com',  role: 'User',  status: 'active' },
    { name: 'Eka Putri',      email: 'eka@mail.com',   role: 'User',  status: 'active' },
  ])

  // ── Fetch dari API ────────────────────────────────────────────────
  async function fetchDashboard() {
    // TODO: Uncomment saat API siap
    // try {
    //   const res = await get('/dashboard')
    //   setStats(res.data.stats)
    //   setRecentUsers(res.data.recent_users)
    //   setChartBarData(res.data.chart_monthly)
    //   setChartLineData(res.data.chart_weekly)
    // } catch {
    //   // handle error
    // }
  }

  useEffect(() => { fetchDashboard() }, [])

  return (
    <div className="grid gap-[var(--xx)]">

      <SectionTitle text="Dashboard" />

      {/* Stats Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[var(--m)]">
        {stats.map((stat) => (
          <CardWrapper key={stat.label} replaceShadowWithBorder>
            <div className="flex items-center justify-between gap-[var(--m)]">
              <div className="grid gap-[var(--xxs)]">
                <p className="text-link text-[length:var(--s)]">{stat.label}</p>
                <p className="text-[length:var(--xx)] font-bold text-text">{stat.value}</p>
                <p className={`text-[length:var(--xs)] ${stat.trendUp ? 'text-success' : 'text-danger'}`}>
                  {stat.trend} bulan ini
                </p>
              </div>
              <span className="text-[36px]">{stat.icon}</span>
            </div>
          </CardWrapper>
        ))}
      </div>

      {/* Charts Row */}
      <div className="flex flex-wrap gap-[var(--m)]">
        <ChartBar  name="Pendaftaran Bulanan" stats={chartBarData} />
        <ChartLine name="Aktivitas Mingguan"  stats={chartLineData} />
      </div>

      {/* Recent Users */}
      <CardWrapper replaceShadowWithBorder>
        <div className="flex items-center justify-between mb-[var(--m)]">
          <h2 className="font-bold text-[length:var(--l)] text-text">User Terbaru</h2>
          <Link to="/admin/user" className="text-primary text-[length:var(--s)] hover:underline">
            Lihat Semua →
          </Link>
        </div>

        <Table headers={['No', 'Nama', 'Email', 'Role', 'Status']}>
          {recentUsers.map((item, index) => (
            <tr key={item.email}>
              <td className="text-center px-[var(--xs)] py-[var(--s)]">{index + 1}</td>
              <td className="px-[var(--xs)] py-[var(--s)] font-medium">{item.name}</td>
              <td className="px-[var(--xs)] py-[var(--s)] text-link">{item.email}</td>
              <td className="px-[var(--xs)] py-[var(--s)]">{item.role}</td>
              <td className="px-[var(--xs)] py-[var(--s)]">
                <span className={`px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium ${
                  item.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
                }`}>
                  {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </CardWrapper>

    </div>
  )
}
