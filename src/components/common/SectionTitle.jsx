/**
 * SectionTitle — judul section dengan highlight huruf pertama
 *
 * Props:
 *   text — teks judul (default: 'hello world')
 *
 * Usage:
 *   <SectionTitle text="dashboard" />
 */

export default function SectionTitle({ text = 'hello world' }) {
  return (
    <h1 className="capitalize text-[length:var(--x)] font-['Medium',_sans-serif]
                 first-letter:bg-[var(--primary-color)]
                 first-letter:text-white
                 first-letter:p-[2px_var(--xxs)]
                 first-letter:rounded-[var(--radius-s)]
                 mb-[var(--m)]">
      {text}
    </h1>
  )
}
