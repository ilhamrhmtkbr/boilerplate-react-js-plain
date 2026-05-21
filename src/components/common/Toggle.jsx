/**
 * Toggle — switch toggle
 *
 * Props:
 *   value    — Boolean nilai toggle
 *   onChange — (checked: boolean) => void
 *   label    — label teks (opsional)
 *
 * Usage:
 *   <Toggle value={isActive} onChange={setIsActive} label="Active" />
 */

export default function Toggle({ value = false, onChange, label = '' }) {
  return (
    <div className="flex items-center justify-start gap-[var(--m)]">
      <label
        className="relative inline-block w-[63px] h-[33px] rounded-[33px] cursor-pointer transition-all duration-300 border border-line hover:scale-[1.02] hover:border-primary
                   shadow-[inset_3px_3px_6px_0_rgb(204,219,232),inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5)]
                   dark:shadow-[inset_3px_3px_6px_0_rgba(0,0,0,0.5),inset_-3px_-3px_6px_1px_rgba(255,255,255,0.1)]"
      >
        <input
          type="checkbox"
          className="hidden peer"
          checked={value}
          onChange={e => onChange?.(e.target.checked)}
        />
        {/* Slider */}
        <span
          className={`flex items-center justify-center bg-sidebar transition-all duration-300 ease-in-out rounded-[33px] w-[25px] h-[25px] absolute top-1/2 -translate-y-1/2 border border-line shadow-[0_4px_8px_-2px_rgba(9,30,66,0.25),0_0_0_1px_rgba(9,30,66,0.08)]
            ${value ? 'left-[34px]' : 'left-[3px]'}`}
        />
      </label>

      {label && (
        <span className="text-[16px] font-medium min-w-[60px] text-text">{label}</span>
      )}
    </div>
  )
}
