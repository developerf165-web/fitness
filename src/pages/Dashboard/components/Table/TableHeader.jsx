export default function TableHeader({ headers }) {
  return (
    <thead>
      <tr className="text-gray-300 text-left bottom-border-color">
        {headers.map((h) => (
          <th key={h} className="p-3 font-medium text-center">
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}
