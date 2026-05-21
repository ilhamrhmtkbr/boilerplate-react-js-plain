/**
 * FormFieldset — input dengan style fieldset + legend
 * Hanya untuk: text | number | password | email
 *
 * Props:
 *   value       — nilai input
 *   onChange    — (value: string) => void
 *   label       — teks legend
 *   type        — text | number | password | email (default: text)
 *   error       — pesan error
 *   disabled    — disabled state
 *   placeholder — placeholder input
 *
 * Usage:
 *   <FormFieldset value={val} onChange={setVal} label="Username" error={error} />
 */

export default function FormFieldset({
  value = '',
  onChange,
  label,
  type = 'text',
  error = '',
  disabled = false,
  placeholder = '',
}) {
  return (
    <div className="grid gap-[var(--xxs)]">
      <fieldset
        className={`outline-none border-2 border-solid rounded-[var(--radius-m)] box-border w-full max-w-[325px] h-max pt-0 px-[var(--xxs)] pb-[6px] transition-colors duration-200
          ${error ? 'border-danger' : 'border-text'}`}
      >
        <legend className="ml-[var(--xxs)] px-[var(--xxs)] text-[length:var(--s)] font-medium text-text">
          {label}
        </legend>
        <input
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className="border-none outline-none pt-[1px] w-full text-[length:var(--m)] font-[inherit] bg-surface text-text placeholder:text-link placeholder:italic"
          onChange={e => onChange?.(e.target.value)}
        />
      </fieldset>
      {error && <p className="text-danger text-[length:var(--xs)] italic">{error}</p>}
    </div>
  )
}
