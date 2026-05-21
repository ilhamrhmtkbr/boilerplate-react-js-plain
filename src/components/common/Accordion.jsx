import { useState } from 'react'

/**
 * Accordion — komponen accordion dengan animasi smooth
 *
 * Props:
 *   items — Array of { id, title, subtitle, content }
 *
 * Usage:
 *   <Accordion items={[
 *     { id: 1, title: 'Title', subtitle: 'Subtitle', content: 'Content' }
 *   ]} />
 */

const defaultItems = [
  {
    id: 1,
    title: 'What is Lorem Ipsum?',
    subtitle: 'Lorem Ipsum is simply dummy text.',
    content: "Lorem Ipsum has been the industry's standard..."
  },
  {
    id: 2,
    title: 'Why do we use it?',
    subtitle: 'It is a long established fact.',
    content: 'It has roots in a piece of classical Latin literature...'
  }
]

export default function Accordion({ items = defaultItems }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="block p-[var(--m)] border-style-default rounded-[var(--radius-s)] max-w-[85dvw]">

          <div
            className={`grid cursor-pointer relative transition-all duration-300 text-[var(--m)] pb-0 border-b border-transparent
              ${openId === item.id ? 'pb-[var(--m)] border-line mb-[var(--m)]' : ''}`}
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            <div className="flex items-center justify-between">
              <p>{item.title}</p>
              <span className={`transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''}`}>▼</span>
            </div>
            <div className="text-[var(--s)] font-light">{item.subtitle}</div>
          </div>

          <div className={`max-h-0 overflow-hidden box-border pr-[var(--xxs)]
            transition-[max-height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${openId === item.id ? 'max-h-[300px] overflow-y-auto' : ''}`}>
            <p>{item.content}</p>
          </div>

        </div>
      ))}
    </div>
  )
}
