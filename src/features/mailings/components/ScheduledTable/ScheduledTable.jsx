import { ArrowUpDown, MoreVertical, Edit, Trash2 } from 'lucide-react'; // Иконкаҳои навро илова кардем
import ChannelIcon from './ChannelIcon';
import DropdownMenu from '/src/components/ui/DropdownMenu';


const ScheduledTable = ({ title, data }) => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="overflow-x-auto rounded-2xl p-4 color-bg-card">
        <table className="w-full text-left">
          <thead className='text-white '>
            <tr className="border-b border-gray-700">
              <th className="p-4 font-medium"><div className="flex items-center">Название <ArrowUpDown size={14} className="ml-2" /></div></th>
              <th className="p-4 font-medium"><div className="flex justify-center items-center">Дата <ArrowUpDown size={14} className="ml-2" /></div></th>
              <th className="p-4 font-medium"><div className="flex justify-center items-center">Каналы <ArrowUpDown size={14} className="ml-2" /></div></th>
              <th className="p-4 font-medium">Преимущества</th>
              <th className="p-4 font-medium"><div className="flex justify-center items-center">Получатели <ArrowUpDown size={14} className="ml-2" /></div></th>
              <th className="p-4 flex items-center justify-center font-medium">Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-gray-400'>
            {data.map((item) => {
              // Рӯйхати амалҳоро барои менюи ҳар як сатр муайян мекунем
              const menuItems = [
                {
                  icon: <Edit size={16} className="mr-2" />, // Иконка барои зебогӣ
                  label: 'Редактировать',
                  action: () => {
                    // Дар ин ҷо логикаи таҳриркунӣ навишта мешавад
                    alert(`Редактировать: ${item.name}`);
                    console.log('Editing item:', item.id);
                  }
                },
                {
                  icon: <Trash2 size={16} className="mr-2" />, // Иконка барои зебогӣ
                  label: 'Удалить',
                  action: () => {
                    // Дар ин ҷо логикаи несткунӣ навишта мешавад
                    alert(`Удалить: ${item.name}`);
                    console.log('Deleting item:', item.id);
                  },
                  className: 'danger'
                }
              ];

              return (
                <tr key={item.id} className="border-b border-gray-800 bg-hover-card">
                  <td className="p-4">{item.name}</td>
                  <td className="p-4 flex justify-center items-center">{item.date}</td>
                  <td className="p-4"><div className="flex justify-center items-center -space-x-3">{item.channels.map((channel, index) => <ChannelIcon key={index} type={channel} zIndex={item.channels.length - index} />)}</div></td>
                  <td className="p-4">{item.benefit}</td>
                  <td className="p-4 flex justify-center items-center">{item.recipients}</td>
                  <td className="p-4 w-1">{item.status}</td>
                  <td className="p-4 text-center w-1">
                    <DropdownMenu items={menuItems}>
                      <button className="p-2 rounded-full hover:text-white transition-colors duration-150 cursor-pointer">
                        <MoreVertical size={16} />
                      </button>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-right"><button className="color-accent pr-4 hover:underline">Ещё</button></div>
    </div>
  );
};

export default ScheduledTable;