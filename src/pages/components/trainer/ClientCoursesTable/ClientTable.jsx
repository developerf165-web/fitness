import React from 'react';

const ClientTable = ({ clients }) => (
  <div className="overflow-x-auto color-bg-card px-4 pt-2 rounded-2xl mb-4">
    <table className="w-full border-collapse table-fixed">
      <colgroup>
        <col className="w-[20%]" />
        <col className="w-[14%]" />
        <col className="w-[12%]" />
        <col className="w-[10%]" />
        <col className="w-[14%]" />
        <col className="w-[14%]" />
        <col className="w-[6%]" />
      </colgroup>
      <tbody>
        {clients.map((client, clientIndex) => (
          <tr
            key={clientIndex}
            className="text-sm border-t m-0 bottom-border-color first:border-t-0 last:border-b-0 bg-hover-card transition-colors duration-200"
          >
            <td className="py-2 w-[12%] whitespace-nowrap">{client.name}</td>
            <td className="py-2 w-[12%] whitespace-nowrap text-gray-400">{client.phone}</td>
            <td className="py-2 w-[12%] whitespace-nowrap text-gray-400">{client.price} TJS</td>
            <td className="py-2 w-[12%] whitespace-nowrap color-accent">{client.discount}</td>
            <td className="py-2 w-[12%] whitespace-nowrap text-white font-medium">{client.finalPrice} TJS</td>
            <td className="py-2 w-[12%] whitespace-nowrap text-gray-400">{client.type}</td>
            <td className="py-2 text-gray-400 whitespace-pre-line text-right">{client.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ClientTable;
