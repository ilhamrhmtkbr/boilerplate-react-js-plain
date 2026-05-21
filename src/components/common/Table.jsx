/**
 * Table — tabel data dengan custom row slot
 *
 * Props:
 *   headers   — Array of string: ['No', 'Title', 'Actions']
 *   items     — Array of data
 *   renderRow — (item, index) => JSX  ← pengganti scoped slot #row
 *
 * Usage:
 *   <Table
 *     headers={['No', 'Title', 'Actions']}
 *     items={dataList}
 *     renderRow={(item, index) => (
 *       <>
 *         <td className="text-center">{index + 1}.</td>
 *         <td className="fit whitespace-normal break-words min-w-[175px]">{item.title}</td>
 *         <td className="flex items-center justify-around gap-[var(--s)]">
 *           <a className="text-primary hover:underline cursor-pointer font-medium uppercase text-[var(--s)]">Save</a>
 *         </td>
 *       </>
 *     )}
 *   />
 */

export default function Table({ headers = [], items = [], renderRow }) {
  return (
    <div className="table-content max-w-full overflow-auto text-[var(--s)]" style={{ scrollbarWidth: 'thin' }}>
      <table className="w-full whitespace-nowrap border-separate border-spacing-0">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}
                className="bg-sidebar border-y border-line min-h-[63px] h-[63px] px-[var(--xs)] vertical-middle font-bold
                           first:border-l first:rounded-l-[var(--radius-m)] text-center
                           last:border-r last:rounded-r-[var(--radius-m)]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="even:bg-sidebar hover:bg-sidebar-hover transition-colors">
              {renderRow?.(item, index)}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        td:hover { background-color: var(--transsecond-primary-color); }
        td.action :hover { text-decoration: underline; }
      `}</style>
    </div>
  )
}
