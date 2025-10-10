import { useState, useEffect } from 'react';
import DropdownMenu from '../components/ui/DropdownMenu'; 
import getMailingsMenuItems from '/src/features/mailings/data/mailingsMenuData';
import ScheduledTable from '/src/features/mailings/components/ScheduledTable/ScheduledTable';
import { scheduledData, deliveredData } from '/src/features/mailings/data/mailingsData';
import MailingForm from '/src/features/mailings/components/MailingForm/MailingForm';
import Modal from '../components/ui/Modal';
import SearchComponent from '/src/pages/Dashboard/components/SearchComponent';

const MailingsPage = () => {
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setModalType(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  const mailingMenuItems = getMailingsMenuItems({ onOpenModal: handleOpenModal });

  return (
    <div className="w-full mx-auto py-8 relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl text-white font-bold">Рассылки</h1>

        <DropdownMenu items={mailingMenuItems}>
          <button
            className="color-bg-accent cursor-pointer text-black font-semibold py-3 px-6 rounded-xl hover:bg-lime-400 transition"
          >
            Добавить
          </button>
        </DropdownMenu>

      </div>

      <SearchComponent />

      <div className="mt-12">
        <ScheduledTable title="Запланированные" data={scheduledData} />
      </div>
      <div className="mt-12">
        <ScheduledTable title="Доставленные" data={deliveredData} />
      </div>

      <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
          {modalType && (
            <div className="w-full max-w-2xl rounded-lg p-6 h-[90vh] max-h-[700px] flex flex-col">
              <MailingForm type={modalType} onClose={() => setModalType(null)} />
            </div>
          )}
      </Modal>
    </div>
  );
};

export default MailingsPage;