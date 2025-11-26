export default function TableRowSkeleton({ fields }) {
  return (
    <tr className="border-b bottom-border-color">
      {fields.map((_, i) => (
        <td key={i} className="p-3">
          <div
            className={`
              relative overflow-hidden rounded-md h-6
              ${i === 0 || i === 1 ? "w-[120px] min-w-[100px]" : "w-full"} 
            `}
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
          </div>
        </td>
      ))}
    </tr>
  );
}
