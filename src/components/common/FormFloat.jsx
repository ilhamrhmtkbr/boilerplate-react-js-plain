/**
 * FormFloat — input dengan floating label style (like Google)
 * Hanya untuk: text | number | password | email
 *
 * Props:
 *   value    — nilai input
 *   onChange — (value: string) => void
 *   label    — teks floating label
 *   id       — id input (wajib)
 *   type     — text | number | password | email (default: text)
 *   error    — pesan error
 *   disabled — disabled state
 *
 * Trik Tailwind: pakai `peer` di input, lalu `peer-focus:` dan
 * `peer-[:not(:placeholder-shown)]:` di label
 *
 * Usage:
 *   <FormFloat value={email} onChange={setEmail} id="email" label="Email" error={error} />
 */

export default function FormFloat({
  value = '',
  onChange,
  label,
  id,
  type = 'text',
  error = '',
  disabled = false,
}) {
  return (
    <div className="grid gap-[var(--xxs)]">
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          disabled={disabled}
          placeholder=" "
          className={`peer w-full text-[length:var(--m)] font-[inherit] bg-surface text-text border-2 border-line p-[var(--s)] outline-none box-border rounded-[var(--radius-s)] transition-colors duration-200 focus:border-primary disabled:bg-surface disabled:text-text
            ${error ? 'border-danger!' : ''}`}
          onChange={e => onChange?.(e.target.value)}
        />
        <label
          htmlFor={id}
          className="absolute left-[var(--m)] top-1/2 -translate-y-1/2 text-[length:var(--m)] text-link pointer-events-none transition-all duration-200
                    peer-focus:top-0 peer-focus:text-[length:var(--s)] peer-focus:bg-surface peer-focus:text-primary peer-focus:px-1 peer-focus:-translate-y-1/2
                    peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[length:var(--s)] peer-[:not(:placeholder-shown)]:bg-surface peer-[:not(:placeholder-shown)]:text-link peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:-translate-y-1/2"
        >
          {label}
        </label>
      </div>
      {error && <p className="text-danger text-[length:var(--xs)] italic">{error}</p>}
    </div>
  )
}
