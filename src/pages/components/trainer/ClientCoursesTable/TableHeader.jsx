import React from 'react';

const TableHeader = ({ headers }) => (
  <div className="overflow-x-auto mb-4 color-bg-card rounded-lg">
    <table className="w-full border-collapse">
      <thead className="text-gray-400 text-xs">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={`px-4 py-4 text-lg text-white font-bold whitespace-nowrap ${index === 0 ? 'rounded-tl-lg' : ''} ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  </div>
);

export default TableHeader;