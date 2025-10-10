import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export default function Table({ data, headers, fields }) {
  return (
    <div className="rounded-4xl overflow-hidden p-6 shadow-lg color-bg-nav border-box my-4 text-white">
      <table className="w-full border-collapse">
        <TableHeader headers={headers} />
        <tbody>
          {data.map((user, i) => (
            <TableRow key={i} user={user} fields={fields} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
