import TableHeader from "./TableHeader";
import TableRow from "./TableRow/index";
import TableRowSkeleton from "./TableRowSkeleton";

export default function Table({ data, headers, fields, loading, isPageBlocked, onRowClick, minHeight = true, isQuarantine = false }) {
  return (
    <div className={minHeight ? "min-h-[500px]" : ""}>
      <div className="rounded-4xl overflow-hidden p-6 shadow-lg color-bg-nav border-box my-4 text-white">
        <table className="w-full border-collapse">
          <TableHeader headers={headers} isQuarantine={isQuarantine} />
          <tbody>
            {loading
              ? Array(10)
                .fill(null)
                .map((_, i) => <TableRowSkeleton key={i} fields={fields} />)
              : data.length > 0
                ? data.map((user) => (
                  <TableRow
                    key={user.id}
                    user={user}
                    fields={fields}
                    isPageBlocked={isPageBlocked}
                    onRowClick={onRowClick}
                  />
                ))
                : (
                  <tr>
                    <td
                      colSpan={fields.length}
                      className="text-center py-10 text-gray-400"
                    >
                      Ничего не найдено
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}