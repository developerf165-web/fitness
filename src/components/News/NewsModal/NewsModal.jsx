import { useEffect } from 'react';
import NewsForm from './NewsForm'; // Фарз мекунем, ки ҳамаи файлҳо дар як ҷузвдон ҳастанд

function NewsModal({ isOpen, onClose, onSubmit, initialData = null }) {
  // Илова кардани функсия барои пӯшидани равзана бо тугмаи Esc
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose} // Ҳангоми клик дар заминаи сиёҳ, равзана пӯшида мешавад
    >
      <div 
        className="w-full max-w-2xl rounded-lg p-6 h-[90vh] max-h-[750px] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Пешгирӣ аз пӯшида шудани равзана ҳангоми клик дар дохили он
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <NewsForm 
            onClose={onClose}
            onSubmit={onSubmit}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}

export default NewsModal;