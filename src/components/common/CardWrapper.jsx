/**
 * CardWrapper — reusable card component
 *
 * Props:
 *   replaceShadowWithBorder — ganti box-shadow jadi border (Boolean)
 *   children                — konten utama card
 *   actions                 — JSX untuk tombol / link (opsional)
 *   datetime                — JSX untuk timestamp (opsional)
 *
 * Usage:
 *   <CardWrapper replaceShadowWithBorder>
 *     <div>Content</div>
 *     <template #actions>...</template>   →   actions={<><a>Hire</a></>}
 *     <template #datetime>5 min ago</template>   →   datetime={<p>5 min ago</p>}
 *   </CardWrapper>
 */

export default function CardWrapper({ replaceShadowWithBorder = false, children, actions, datetime }) {
  return (
    <div className={`box-border grid auto-rows-max gap-[var(--m)] p-[var(--l)] rounded-[var(--radius-m)] shadow-box
      ${replaceShadowWithBorder ? '' : 'shadow-none [border:var(--border)]'}`}>

      {children}

      {actions && (
        <div className="flex items-center justify-end flex-wrap gap-[var(--m)] w-full text-[var(--s)] mt-[var(--xx)] [&>*]:cursor-pointer [&>*:hover]:underline">
          {actions}
        </div>
      )}

      {datetime && (
        <p className="text-[var(--xs)] italic font-thin text-link">
          {datetime}
        </p>
      )}

    </div>
  )
}
