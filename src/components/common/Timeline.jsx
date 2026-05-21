/**
 * Timeline — komponen timeline vertikal
 *
 * Props:
 *   items — Array of { title, desc, time, active? }
 *
 * Usage:
 *   <Timeline items={[
 *     { title: 'Project Started', desc: 'Deskripsi', time: '2 hours ago', active: true },
 *   ]} />
 */

export default function Timeline({ items = [] }) {
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-[var(--m)] grid-rows-[max-content]">
      {items.map((item, index) => (
        <div key={index} className="contents">

          {/* Kolom Kiri: Dot & Line */}
          <div className="flex flex-col">
            <span
              className={`flex items-center justify-center min-w-[var(--xxxx)] min-h-[var(--xxxx)] max-w-[var(--xxxx)] max-h-[var(--xxxx)] rounded-[var(--xxxx)] font-medium cursor-pointer transition-colors
                ${item.active ? 'bg-primary text-white' : 'bg-link text-scrollthumb hover:bg-primary hover:text-white'}`}
            >
              {index + 1}
            </span>
            {index < items.length - 1 && (
              <div
                className={`min-h-[63px] w-[2px] ml-[calc(var(--xxxx)/2)] translate-x-[-50%] transition-colors ${item.active ? 'bg-primary' : 'bg-link'}`}
              />
            )}
          </div>

          {/* Kolom Kanan: Content */}
          <div className="overflow-auto h-max max-h-[300px] max-w-[400px] mt-[4px]">
            <div className="font-medium text-[var(--l)] text-text">{item.title}</div>
            <div className="text-text/80 text-[var(--m)]">{item.desc}</div>
            <div className="font-light text-[var(--xs)] text-link">{item.time}</div>
          </div>

        </div>
      ))}
    </div>
  )
}
