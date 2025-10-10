import React from 'react';

const ClientTable = ({ clients }) => (
  <div className="overflow-x-auto color-bg-card px-4 pt-2 rounded-2xl mb-4">
    <table className="w-full border-collapse">
      <tbody>
        {clients.map((client, clientIndex) => (
          <tr
            key={clientIndex}
            className="text-sm border-t m-0 bottom-border-color first:border-t-0 last:border-b-0 bg-hover-card transition-colors duration-200"
          >
            <td className="px-4 py-2 whitespace-nowrap">{client.name}</td>
            <td className="px-4 py-2 whitespace-nowrap text-gray-400">{client.phone}</td>
            <td className="px-4 py-2 whitespace-nowrap text-gray-400">{client.price} TJS</td>
            <td className="px-4 py-2 whitespace-nowrap color-accent">{client.discount}</td>
            <td className="px-4 py-2 whitespace-nowrap text-white font-medium">{client.finalPrice} TJS</td>
            <td className="px-4 py-2 whitespace-nowrap text-gray-400">{client.type}</td>
            <td className="px-4 py-2 text-gray-400 whitespace-pre-line">{client.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ClientTable;