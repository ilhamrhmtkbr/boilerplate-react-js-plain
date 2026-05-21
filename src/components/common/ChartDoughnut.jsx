import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

/**
 * ChartDoughnut — Doughnut chart
 *
 * Props:
 *   name  — judul chart
 *   stats — Array of { label: string, value: number, color?: string }
 *
 * Usage:
 *   <ChartDoughnut name="Transaksi" stats={data} />
 */

const DEFAULT_COLORS = [
  '#6366f1', '#f59e0b', '#10b981', '#f43f5e',
  '#3b82f6', '#8b5cf6', '#14b8a6', '#fb923c',
]

const resolveColor = (item, idx) => item.color ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length]

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: {
      position: 'right',
      labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, padding: 16, font: { size: 12 } },
    },
    tooltip: {
      backgroundColor: '#1f2937', padding: 12, cornerRadius: 8,
      callbacks: { label: (ctx) => `  ${ctx.label}: ${ctx.raw}` },
    },
  },
}

export default function ChartDoughnut({ name = 'Chart', stats = [] }) {
  const total = useMemo(() => stats.reduce((acc, i) => acc + i.value, 0), [stats])

  const chartData = useMemo(() => ({
    labels: stats.map(i => i.label),
    datasets: [{
      data:            stats.map(i => i.value),
      backgroundColor: stats.map((i, idx) => resolveColor(i, idx)),
      borderWidth:     0,
      hoverOffset:     6,
    }],
  }), [stats])

  return (
    <div className="p-6 bg-surface rounded-xl shadow-md border-style-default w-full max-w-md max-md:max-w-[88dvw]">

      <div className="flex items-center gap-3 mb-6">
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-transprimary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" className="fill-primary">
            <path d="M0 7.5A7.5 7.5 0 0 1 7 .016v4.019A3.5 3.5 0 0 0 7.5 11a3.48 3.48 0 0 0 2.096-.697l2.842 2.842A7.47 7.47 0 0 1 7.5 15 7.5 7.5 0 0 1 0 7.5zm13.145 4.938A7.47 7.47 0 0 0 15 7.5c0-1.034-.209-2.018-.587-2.914l-3.658 1.626A3.49 3.49 0 0 1 11 7.5a3.48 3.48 0 0 1-.697 2.096l2.842 2.842zM8 4.035V.016a7.5 7.5 0 0 1 5.963 3.675L10.254 5.34A3.5 3.5 0 0 0 8 4.035z" />
          </svg>
        </span>
        <h3 className="text-[length:var(--l,1rem)] font-bold truncate">{name}</h3>
      </div>

      <div className="relative h-56 w-full flex items-center justify-center">
        {stats.length ? (
          <>
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">{total}</span>
              <span className="text-[10px] uppercase tracking-widest text-link mt-0.5">Total</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-link italic">Data kosong</p>
        )}
      </div>

    </div>
  )
}
