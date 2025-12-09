export default function TableRowSkeleton({ fields }) {
  return (
    <tr className="border-b bottom-border-color">
      {fields.map((_, i) => (
        <td key={i} className="p-3">
          <div
            className={`
              rounded-md h-6 skeleton-shimmer
              ${i === 0 || i === 1 ? "w-[120px] min-w-[100px]" : "w-full"} 
            `}
          >
            {/* Inner div removed as animation is now handled by skeleton-shimmer::after */}
          </div>
        </td>
      ))}
    </tr>
  );
}
