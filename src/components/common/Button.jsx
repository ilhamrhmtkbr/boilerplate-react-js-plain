/**
 * Button — tombol dengan variant dan tipe
 *
 * Props:
 *   text     — teks tombol (default: 'Submit')
 *   variant  — primary | warning | success | danger (default: 'primary')
 *   type     — solid | outline | badge (default: 'solid')
 *   disabled — Boolean (default: false)
 *   loading  — Boolean (default: false)
 *   onClick  — handler
 *
 * Usage:
 *   <Button text="Click" />
 *   <Button text="Delete" variant="danger" />
 *   <Button text="Outline" variant="primary" btnType="outline" />
 *   <Button text="Badge" variant="success" btnType="badge" />
 *   <Button text="Loading" loading={true} />
 *   <Button text="Disabled" disabled={true} />
 */

export default function Button({
  text = 'Submit',
  variant = 'primary',
  btnType = 'solid',
  disabled = false,
  loading = false,
  onClick,
}) {
  const solidMap = {
    primary: 'bg-primary text-bg hover:ring-4 hover:ring-transprimary',
    warning: 'bg-warning text-bg hover:ring-4 hover:ring-transwarning',
    success: 'bg-success text-bg hover:ring-4 hover:ring-transsuccess',
    danger:  'bg-danger  text-bg hover:ring-4 hover:ring-transdanger',
  }
  const outlineMap = {
    primary: 'border text-primary border border-solid border-line hover:border-primary hover:ring-4 hover:ring-transprimary',
    warning: 'border text-warning border border-solid border-line hover:border-warning hover:ring-4 hover:ring-transwarning',
    success: 'border text-success border border-solid border-line hover:border-success hover:ring-4 hover:ring-transsuccess',
    danger:  'border text-danger  border border-solid border-line hover:border-danger  hover:ring-4 hover:ring-transdanger',
  }
  const badgeMap = {
    primary: 'bg-transprimary text-primary rounded-full hover:bg-primary hover:text-bg',
    warning: 'bg-transwarning text-warning rounded-full hover:bg-warning hover:text-bg',
    success: 'bg-transsuccess text-success rounded-full hover:bg-success hover:text-bg',
    danger:  'bg-transdanger  text-danger  rounded-full hover:bg-danger  hover:text-bg',
  }

  const variantClass = btnType === 'solid'
    ? solidMap[variant]
    : btnType === 'outline'
    ? outlineMap[variant]
    : badgeMap[variant]

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={`cursor-pointer border-none outline-none flex items-center justify-center gap-2
            px-[var(--m)] py-[calc(var(--m)/2)]
            min-w-[77px] w-max rounded-[var(--radius-s)]
            text-[length:var(--s)] font-medium
            transition-all duration-200 dark:text-white
            disabled:opacity-50 disabled:cursor-not-allowed
            ${variantClass}`}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {!loading && <span>{text}</span>}
    </button>
  )
}
