/**
 * LoadingBar — progress bar
 *
 * Props:
 *   progress — nilai progress 0–100 (controlled). Kalau null → pakai animated
 *   animated — auto-fill animasi 11s (untuk loading page dll)
 *
 * Tambahkan ke index.css + @theme:
 *   @keyframes fillProgress { from { width: 0; } to { width: 100%; } }
 *   --animate-fill-progress: fillProgress 11s ease-out forwards;
 *
 * Usage:
 *   <LoadingBar progress={uploadPercent} />
 *   <LoadingBar animated />
 */

export default function LoadingBar({ progress = null, animated = false }) {
  return (
    <div className="h-[var(--s)] bg-white/20 rounded-full overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
      <div
        className={`h-full bg-primary rounded-full ${animated && progress === null ? 'animate-fill-progress' : ''}`}
        style={progress !== null ? { width: `${progress}%`, transition: 'width 0.3s ease' } : {}}
      />
    </div>
  )
}
