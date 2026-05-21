/**
 * LoadingPulse — skeleton shimmer, buat placeholder konten saat loading
 *
 * Tambahkan ke index.css + @theme:
 *   @keyframes skeleton-loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
 *   --animate-skeleton: skeleton-loading 2s infinite;
 *
 * Props:
 *   width   — lebar (default: '100%')
 *   height  — tinggi (default: 'var(--m)')
 *   rounded — border radius class Tailwind (default: 'rounded-[var(--radius-m)]')
 *
 * Usage:
 *   <LoadingPulse height="var(--m)" />
 *   <LoadingPulse width="48px" height="48px" rounded="rounded-full" />
 *   <div className="card-wrapper grid gap-[var(--m)]">
 *     <LoadingPulse width="48px" height="48px" rounded="rounded-full" />
 *     <LoadingPulse height="var(--m)" />
 *     <LoadingPulse height="var(--m)" width="70%" />
 *   </div>
 */

export default function LoadingPulse({
  width   = '100%',
  height  = 'var(--m)',
  rounded = 'rounded-[var(--radius-m)]',
}) {
  return (
    <div
      className={`animate-skeleton bg-[length:200%_100%] shrink-0 ${rounded}`}
      style={{
        width,
        height,
        backgroundImage: 'linear-gradient(90deg, var(--border-color), var(--transbg-color) 50%, var(--border-color) 75%)',
      }}
    />
  )
}
