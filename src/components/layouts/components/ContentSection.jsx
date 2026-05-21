export default function ContentSection({ children }) {
  return (
    <section className="box-border py-[var(--m)] h-max grid auto-rows-max gap-[var(--xx)]">
      {children}
    </section>
  )
}
