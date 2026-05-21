import { useState } from 'react'
import Modal from './Modal'
import { removeUnderscoreAndCapitalize } from '../utils/formatText'

/**
 * Filter — tombol filter dengan modal pilihan
 *
 * Props:
 *   title   — judul tombol & modal (default: 'Sort By')
 *   filters — Array of string atau Array of { label, value }
 *   value   — nilai terpilih
 *   onChange — callback ketika item dipilih → (value) => void
 *
 * Usage:
 *   <Filter title="Sort By" filters={['Ascending', 'Descending']} value={sort} onChange={setSort} />
 *   <Filter title="Status" filters={[{ label: 'Aktif', value: 'active' }]} value={status} onChange={setStatus} />
 */

export default function Filter({ title = 'Sort By', filters = [], value = '', onChange }) {
  const [showModal, setShowModal] = useState(false)

  const getValue = (item) => (typeof item === 'object' ? item.value : item)
  const getLabel = (item) => (typeof item === 'object' ? item.label : item)

  const selectItem = (item) => {
    const val = getValue(item)
    onChange?.(val)
    setShowModal(false)
  }

  return (
    <>
      {/* Tombol Trigger */}
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer group outline-none flex items-center justify-center gap-x-4 py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] w-max rounded-[var(--radius-s)] text-[length:var(--s)] border border-solid border-line hover:outline-4 hover:outline-solid hover:outline-transprimary hover:border hover:border-solid hover:border-primary hover:text-primary"
      >
        <svg className="max-w-[var(--l)] max-h-[var(--l)] fill-text group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v1.172a3 3 0 0 1-.879 2.121l-5.828 5.828a1 1 0 0 0-.293.707v2.343a3 3 0 0 1-.879 2.121l-2.202 2.202C10.842 22.572 9 21.809 9 20.286v-5.457a1 1 0 0 0-.293-.707L2.879 8.293A3 3 0 0 1 2 6.172V5z" />
        </svg>
        <span className="capitalize font-medium text-[length:var(--s)]">
          {value ? removeUnderscoreAndCapitalize(String(value)) : title}
        </span>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} title={title} onClose={() => setShowModal(false)} footer={<p>Filter</p>}>
        <div className="grid grid-cols-1 gap-2 w-full">
          {filters.map((item, key) => (
            <div
              key={key}
              onClick={() => selectItem(item)}
              className={`cursor-pointer font-['Medium',_ui-sans-serif] bg-translink py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] rounded-[var(--radius-s)] text-[length:var(--s)] border-2 border-solid transition-colors
                ${getValue(item) === value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-link hover:border-primary hover:text-primary'}`}
            >
              {getLabel(item)}
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
