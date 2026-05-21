/**
 * FormField — regular form field, full-featured
 *
 * Props:
 *   value       — nilai input / modelValue
 *   onChange    — callback: (value) => void
 *   label       — label teks
 *   id          — id input (wajib)
 *   name        — name attribute
 *   type        — text | number | email | password | date | file | select | radio | checkbox | textarea
 *   error       — pesan error
 *   disabled    — disabled state
 *   placeholder — placeholder
 *   options     — Array<{ label: string, value: string }> → untuk select | radio | checkbox group
 *   rows        — jumlah baris textarea (default: 5)
 *   accept      — file accept attribute
 *
 * NOTE: Tambahkan ke index.css (tidak bisa pakai Tailwind):
 *
 *   input::-webkit-file-upload-button {
 *     cursor: pointer;
 *     border: 1px solid var(--primary-color);
 *     color: var(--primary-color);
 *     background-color: var(--bg-color);
 *     padding: 7px var(--xs);
 *     min-width: 63px;
 *     border-radius: var(--radius-s);
 *     transition: .2s;
 *     font-family: Medium, ui-sans-serif;
 *     font-size: var(--s);
 *   }
 *   input::-webkit-file-upload-button:hover {
 *     color: var(--bg-color);
 *     background-color: var(--primary-color);
 *   }
 *   input:-webkit-autofill,
 *   input:-webkit-autofill:hover,
 *   input:-webkit-autofill:focus { background-color: var(--bg-color) !important; }
 *   input[type='date']::-webkit-calendar-picker-indicator { cursor: pointer; }
 *
 * Usage:
 *   <FormField value={name} onChange={setName} id="name" label="Full Name" />
 *   <FormField value={role} onChange={setRole} id="role" label="Role" type="select" options={roleOptions} />
 *   <FormField value={hobbies} onChange={setHobbies} id="hobbies" label="Hobbies" type="checkbox" options={hobbyOptions} />
 */

const baseInput = 'text-[length:var(--m)] font-[inherit] w-full cursor-pointer bg-surface text-text border border-line p-[var(--s)] outline-none box-border h-max rounded-[var(--radius-s)] transition-colors duration-200 placeholder:text-link placeholder:italic disabled:bg-surface disabled:text-text'

export default function FormField({
  value = '',
  onChange,
  label,
  id,
  name,
  type = 'text',
  error = '',
  disabled = false,
  placeholder = '',
  options = [],
  rows = 5,
  accept = '',
}) {
  const isCheckboxGroup = type === 'checkbox' && options.length > 0
  const inputName = name || id

  const handleCheckboxGroup = (optValue, checked) => {
    const current = Array.isArray(value) ? [...value] : []
    if (checked) onChange?.([...current, optValue])
    else onChange?.(current.filter(v => v !== optValue))
  }

  const errorClass = error ? 'border-danger!' : ''

  return (
    <div className="grid gap-[var(--xxs)] w-full max-w-[500px]">

      {/* Label — kecuali radio & checkbox group */}
      {type !== 'radio' && !isCheckboxGroup && (
        <label htmlFor={id} className="capitalize font-medium text-[length:var(--s)] text-text">
          {label}
        </label>
      )}

      {/* Text / Number / Email / Password */}
      {['text', 'number', 'email', 'password'].includes(type) && (
        <input id={id} name={inputName} type={type} value={value} disabled={disabled} placeholder={placeholder}
          className={`${baseInput} ${errorClass}`}
          onChange={e => onChange?.(e.target.value)} />
      )}

      {/* Date */}
      {type === 'date' && (
        <input id={id} name={inputName} type="date" value={value} disabled={disabled}
          className={`${baseInput} cursor-auto max-[800px]:max-w-[57dvw] ${errorClass}`}
          onChange={e => onChange?.(e.target.value)} />
      )}

      {/* File */}
      {type === 'file' && (
        <input id={id} name={inputName} type="file" accept={accept} disabled={disabled}
          className={`${baseInput} ${errorClass}`}
          onChange={e => onChange?.(e.target.files[0] ?? null)} />
      )}

      {/* Select */}
      {type === 'select' && (
        <select id={id} name={inputName} disabled={disabled} value={value}
          className={`${baseInput} ${errorClass}`}
          onChange={e => onChange?.(e.target.value)}>
          <option value="" disabled>-- Pilih --</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}

      {/* Textarea */}
      {type === 'textarea' && (
        <textarea id={id} name={inputName} disabled={disabled} placeholder={placeholder} rows={rows} value={value}
          className={`${baseInput} resize-none ${errorClass}`}
          onChange={e => onChange?.(e.target.value)} />
      )}

      {/* Radio group */}
      {type === 'radio' && (
        <div className="grid gap-[var(--xxs)]">
          <span className="capitalize font-medium text-[length:var(--s)] text-text">{label}</span>
          <div className="flex flex-wrap gap-[var(--m)]">
            {options.map(opt => (
              <label key={opt.value} className="flex items-center gap-[var(--xxs)] cursor-pointer text-[length:var(--s)] text-text">
                <input type="radio" name={inputName} value={opt.value} checked={value === opt.value} disabled={disabled}
                  className="w-4 h-4 cursor-pointer accent-primary shrink-0"
                  onChange={() => onChange?.(opt.value)} />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Checkbox tunggal (boolean) */}
      {type === 'checkbox' && !isCheckboxGroup && (
        <label htmlFor={id} className="flex items-center gap-[var(--xxs)] cursor-pointer text-[length:var(--s)] text-text capitalize">
          <input id={id} type="checkbox" name={inputName} checked={!!value} disabled={disabled}
            className="w-4 h-4 cursor-pointer accent-primary shrink-0"
            onChange={e => onChange?.(e.target.checked)} />
          {label}
        </label>
      )}

      {/* Checkbox group */}
      {isCheckboxGroup && (
        <div className="grid gap-[var(--xxs)]">
          <span className="capitalize font-medium text-[length:var(--s)] text-text">{label}</span>
          <div className="flex flex-wrap gap-[var(--m)]">
            {options.map(opt => (
              <label key={opt.value} className="flex items-center gap-[var(--xxs)] cursor-pointer text-[length:var(--s)] text-text">
                <input type="checkbox" name={inputName} value={opt.value}
                  checked={Array.isArray(value) && value.includes(opt.value)}
                  disabled={disabled}
                  className="w-4 h-4 cursor-pointer accent-primary shrink-0"
                  onChange={e => handleCheckboxGroup(opt.value, e.target.checked)} />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-danger text-[length:var(--xs)] italic">{error}</p>}

    </div>
  )
}
