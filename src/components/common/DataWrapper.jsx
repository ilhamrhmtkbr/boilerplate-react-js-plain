/**
 * DataWrapper — list key-value data
 *
 * Props:
 *   items — Array of { label: string, value: any }
 *
 * Usage:
 *   const userData = [
 *     { label: 'name', value: 'Ilham Rahmat Akbar' },
 *     { label: 'position', value: 'Fullstack Developer' },
 *   ]
 *   <DataWrapper items={userData} />
 */

const defaultItems = [{ label: 'Name', value: 'Ilham' }]

export default function DataWrapper({ items = defaultItems }) {
  return (
    <div className="flex flex-col gap-[var(--xs)]">
      {items.map((item, index) => (
        <div key={index} className="border border-line rounded-[var(--radius-m)] px-[var(--m)] py-[var(--xs)] bg-transparent">
          <dt className="font-light capitalize text-[var(--s)] text-link">{item.label}</dt>
          <dd className="font-medium">{item.value}</dd>
        </div>
      ))}
    </div>
  )
}
