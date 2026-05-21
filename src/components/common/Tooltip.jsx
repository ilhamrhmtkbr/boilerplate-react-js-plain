/**
 * Tooltip — tooltip saat hover
 *
 * Props:
 *   text     — teks tooltip
 *   children — elemen yang di-hover
 *
 * Usage:
 *   <Tooltip text="Java">
 *     <p className="cursor-pointer">Java</p>
 *   </Tooltip>
 */

export default function Tooltip({ text, children }) {
  return (
    <div className="relative inline-block group" data-tooltip={text}>
      {children}
      <div className="
        invisible group-hover:visible
        absolute z-[111] left-0
        bottom-[-2.5rem] md:bottom-[-2.2rem]
        bg-text text-bg
        py-[7px] px-[11px]
        rounded-[5px] text-[var(--xs)] font-medium
        whitespace-nowrap transition-all duration-200
      ">
        {text}
      </div>
    </div>
  )
}
