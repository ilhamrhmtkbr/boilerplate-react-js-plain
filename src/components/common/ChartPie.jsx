import { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

/**
 * ChartPie — Pie chart
 *
 * Props:
 *   name  — judul chart
 *   stats — Array of { label, value, color? }
 *
 * Usage:
 *   <ChartPie name="Distribusi" stats={[{ label: 'A', value: 500, color: '#6366f1' }]} />
 */

const DEFAULT_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#f43f5e', '#3b82f6', '#8b5cf6', '#14b8a6', '#fb923c']
const resolveColor = (item, idx) => item.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]

const chartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { usePointStyle: true, pointStyle: 'circle', padding: 20, font: { size: 12 } },
    },
    tooltip: {
      backgroundColor: '#1f2937', padding: 12, cornerRadius: 8,
      callbacks: { label: (ctx) => { const label = ctx.label ? `  ${ctx.label}: ` : ''; return `${label}${ctx.parsed} unit` } },
    },
  },
  animation: { duration: 1200, easing: 'easeInOutQuart' },
}

export default function ChartPie({ name = 'Chart', stats = [] }) {
  const chartData = useMemo(() => ({
    labels: stats.map(i => i.label),
    datasets: [{
      label: name, data: stats.map(i => i.value),
      backgroundColor: stats.map((i, idx) => resolveColor(i, idx)),
      borderWidth: 0, hoverOffset: 0,
    }],
  }), [stats, name])

  return (
    <div className="p-6 bg-surface rounded-xl shadow-md border-style-default w-full max-w-md max-md:max-w-[88dvw]">

      <div className="flex items-center gap-3 mb-6">
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-transprimary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" className="fill-primary">
            <path d="M15 0v17.3l15.947 4.784C31.568 20.543 32 18.688 32 16.571 32 7.419 23.453 0 15 0h0zm-2 3c-6.971.728-13 7.026-13 14.5C0 25.508 6.492 32 14.5 32c5.897 0 10.963-3.526 13.229-8.582L13 19V3h0z" fillRule="evenodd" />
          </svg>
        </span>
        <h3 className="text-[length:var(--l,1rem)] font-bold truncate">{name}</h3>
      </div>

      <div className="h-64 w-full flex items-center justify-center">
        {stats.length
          ? <Pie data={chartData} options={chartOptions} />
          : <p className="text-sm text-link italic">Belum ada data</p>
        }
      </div>

    </div>
  )
}
