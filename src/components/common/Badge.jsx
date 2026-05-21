/**
 * Badge — label/chip dengan variant warna
 *
 * Props:
 *   text     — teks badge (default: 'Message')
 *   variant  — primary | warning | success | danger (default: 'primary')
 *   closable — tampilkan tombol close (default: true)
 *
 * Usage:
 *   <Badge text="Message" variant="primary" closable={true} />
 *   <Badge text="Success" variant="success" closable={false} />
 */

export default function Badge({ text = 'Message', variant = 'primary', closable = true }) {
  const solidVariants = {
    primary: 'bg-primary',
    warning: 'bg-warning',
    success: 'bg-success',
    danger:  'bg-danger',
  }
  const transVariants = {
    primary: 'bg-transprimary text-primary',
    warning: 'bg-transwarning text-warning',
    success: 'bg-transsuccess text-success',
    danger:  'bg-transdanger text-danger',
  }

  const variantClass = closable ? transVariants[variant] : `${solidVariants[variant]} text-white`
  const sizeClass = closable
    ? 'pl-[25px] pr-[var(--x)] py-[var(--xs)] justify-between'
    : 'px-[var(--m)] py-[5px] text-[length:var(--s)]'

  return (
    <div className="flex items-center justify-start gap-[var(--m)] flex-wrap">
      <div className={`break-all font-medium rounded-full box-border w-max max-w-[75dvw] h-max flex items-center gap-[var(--s)] ${sizeClass} ${variantClass}`}>
        <p>{text}</p>

        {closable && (
          <div className="min-w-[23px] min-h-[23px] max-w-[23px] max-h-[23px]
                        flex items-center justify-center
                        border-2 rounded-full cursor-pointer
                        bg-surface border-danger text-danger
                        hover:bg-danger hover:text-white">
            <svg className="max-w-[9px] max-h-[9px] fill-current" viewBox="0 0 27 27">
              <path d="M8 1l5 6 6-6c2-1 5-1 6 0 2 2 2 5 0 7l-5 5 5 6c2 2 2 5 0 6-1 2-4 2-6 0l-6-5-5 5c-2 2-5 2-7 0-1-1-1-4 0-6l6-6-6-5C0 6 0 3 1 1c2-1 5-1 7 0z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
