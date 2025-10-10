import React from 'react';

const StatusBadge = ({ value, status }) => {
  let bgColor = 'bg-green-700'; 
  if (status === 'yellow') bgColor = 'bg-yellow-700'; // Example for another status

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} text-white`}>
      {value}
    </span>
  );
};

const ReusableTable = ({ data = [], columns = [], title = 'Индивидуальный (32)' }) => {
  return (
    <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg  mx-auto">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-xl font-bold text-gray-100">{title}</h2>
        <div className="text-sm text-blue-400 cursor-pointer hover:text-blue-300">
          Групповой ряд
        </div>
      </div>

      <div className="overflow-x-auto max-h-[80vh]">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800 sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider ${column.style}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-800 transition duration-150 ease-in-out"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-200 ${column.style}`}
                  >
                    {column.key === 'type' ? (
                      <StatusBadge value={row[column.key]} status={row.status} />
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 text-right">
        <div className="text-sm text-blue-400 cursor-pointer hover:text-blue-300">
          Ещё
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;