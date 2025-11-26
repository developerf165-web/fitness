import React from 'react';

const TableHeader = ({ headers }) => (
  <div className="overflow-x-auto mb-4 color-bg-card rounded-lg">
    <table className="w-full border-collapse table-fixed">
      <colgroup>
        <col className="w-[18%]" />
        <col className="w-[16%]" />
        <col className="w-[11%]" />
        <col className="w-[14%]" />
        <col className="w-[14%]" />
        <col className="w-[14%]" />
        <col className="w-[14%]" />
      </colgroup>
      <thead className="text-gray-400 text-xs">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={`px-4 py-4 text-lg text-white font-bold whitespace-nowrap 
                ${
                  index === 0
                    ? 'rounded-tl-lg text-left'
                    : index === headers.length - 1
                    ? 'rounded-tr-lg text-right'
                    : 'text-center'
                }`}
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
