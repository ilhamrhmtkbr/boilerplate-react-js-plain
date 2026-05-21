/**
 * LoadingSpinner — spinner circle, pakai animate-spin bawaan Tailwind
 *
 * Props:
 *   size — ukuran spinner (default: 'var(--x)')
 *
 * Usage:
 *   <LoadingSpinner />
 *   <LoadingSpinner size="var(--xx)" />
 */

export default function LoadingSpinner({ size = 'var(--x)' }) {
  return (
    <div
      className="border-4 border-transparent border-t-primary rounded-full bg-transparent animate-spin shrink-0"
      style={{ width: size, height: size }}
    />
  )
}
