import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale, Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

/**
 * ChartLine — Line chart (single & multi line)
 *
 * Props:
 *   name   — judul chart
 *   stats  — Array of { label, value } (single) atau Array of { label, color?, data: [{label, value}] } (multi)
 *   smooth — pakai kurva smooth (default: true)
 *
 * Usage single:
 *   <ChartLine name="Pengunjung" stats={[{ label: 'Jan', value: 120 }]} />
 *
 * Usage multi:
 *   <ChartLine name="Revenue vs Expense" stats={[
 *     { label: 'Revenue', color: '#6366f1', data: [{ label: 'Jan', value: 400 }] },
 *   ]} />
 */

const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#14b8a6', '#fb923c']

function makeDataset(label, data, color, tension) {
  return {
    label, data: data.map(i => i.value),
    borderColor: color, backgroundColor: color + '22',
    borderWidth: 2.5, pointRadius: 4, pointHoverRadius: 6,
    pointBackgroundColor: color, tension, fill: true,
  }
}

const chartOptions = {
  responsive: true, maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: {
      display: true, position: 'top', align: 'end',
      labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, padding: 16, font: { size: 12 } },
    },
    tooltip: { backgroundColor: '#1f2937', padding: 12, cornerRadius: 8 },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: 'rgba(156,163,175,0.15)' }, ticks: { color: '#9ca3af', font: { size: 11 } } },
    x: { grid: { display: false }, ticks: { color: '#6b7280', font: { size: 12, weight: '500' } } },
  },
  animation: { duration: 1200, easing: 'easeInOutQuart' },
}

export default function ChartLine({ name = 'Chart', stats = [], smooth = true }) {
  const isMulti = stats.length > 0 && Array.isArray(stats[0]?.data)
  const tension = smooth ? 0.4 : 0

  const chartData = useMemo(() => {
    if (isMulti) {
      return {
        labels: stats[0].data.map(i => i.label),
        datasets: stats.map((s, idx) => makeDataset(s.label, s.data, s.color ?? COLORS[idx % COLORS.length], tension)),
      }
    }
    return {
      labels: stats.map(i => i.label),
      datasets: [makeDataset(name, stats, COLORS[0], tension)],
    }
  }, [stats, name, tension, isMulti])

  return (
    <div className="p-6 bg-surface rounded-xl shadow-md border-style-default w-full max-w-lg max-md:max-w-[88dvw]">

      <div className="flex items-center gap-3 mb-6">
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-transprimary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </span>
        <h3 className="text-[length:var(--l,1rem)] font-bold truncate">{name}</h3>
      </div>

      <div className="h-72 w-full">
        {stats.length
          ? <Line data={chartData} options={chartOptions} />
          : <div className="flex h-full items-center justify-center text-sm text-link italic">Memuat data...</div>
        }
      </div>

    </div>
  )
}
