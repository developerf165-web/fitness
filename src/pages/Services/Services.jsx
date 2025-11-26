import React, { useState, useEffect } from 'react';
import ServicesHeader from './components/ServicesHeader';
import CardsSection from './components/Cards/CardsSection';
import { fetchServices, deleteService } from './api/servicesApi'; 
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import SectionHeader from '../components/ui/SectionHeader';
import DirectionsSection from './components/Directions/DirectionsSection';
import CoursesSection from './components/Courses/CoursesSection';
import ActiveSection from './components/Active/ActiveSection';
import directionsMockData from './data/directionsMockData';
import coursesMockData from './data/coursesMockData'
import activeMockData from './data/activeMockData'

export default function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null); 
  const [isDeleting, setIsDeleting] = useState(false); 

  useEffect(() => {
    const loadServices = async () => {
      try {
        const dataFromApi = await fetchServices();
        
        const formattedData = dataFromApi.map(item => ({
          id: item.id,
          title: item.name,
          imageUrl: item.img, 
          tjs: item.price,
          pos: 'услуга'
        }));
        
        setServices(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  // 3. Ин функция акнун модалро МЕКУШОЯД (ба ҷои window.confirm)
  // Номи онро аз 'handleDelete' ба 'handleDeletePrompt' иваз кардем
  const handleDeletePrompt = (service) => {
    setServiceToDelete(service); // Объекти пурраи service-ро дар state мемонем
    setIsDeleteModalOpen(true);
  };

  // 4. Ин функция модалро МЕПӮШАД
  const handleCloseModal = () => {
    if (isDeleting) return; // Агар раванди несткунӣ рафта истода бошад, намепӯшем
    setIsDeleteModalOpen(false);
    setServiceToDelete(null);
  };

  // 5. Ин функция несткуниро ТАСДИҚ МЕКУНАД (аз дохили модал даъват карда мешавад)
  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;

    setIsDeleting(true); // Раванди несткуниро сар мекунем
    try {
      // API-ро мувофиқи документатсия даъват мекунем
      await deleteService(serviceToDelete.id);
      
      // Аз state нест мекунем
      setServices(currentServices => 
        currentServices.filter(service => service.id !== serviceToDelete.id)
      );
      
      handleCloseModal(); // Модалро мепӯшем
    } catch (err) {
      alert("Ошибка при удалении: " + err.message);
      // Дар ҳолати хатогӣ, модалро боз мемонем, то корбар хатогиро бинад
    } finally {
      setIsDeleting(false); // Раванди несткуниро ба итмом мерасонем
    }
  };

  // 6. handleEdit акнун тамоми объектро мегирад
  const handleEdit = (service) => {
    console.log("Редактирование элемента:", service);
    alert(`Вызвана функция редактирования для ID ${service.id}.`);
  };
  
  if (isLoading) {
    // Инро метавонед тоза кунед, агар хоҳед, ки скелетонҳо дар ин ҷо кор кунанд
    // return <div className="text-center py-10">⏳ Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <>
      {/* 1. БАХШИ: ГОТОВО К ЗАПУСКУ */}
      <div className="mb-10">
          <SectionHeader title="Готово к запуску" />
          <CoursesSection 
              items={coursesMockData}
              variant="launch"
              isLoading={false}
              onEdit={(item) => console.log('Edit Course', item.id)}
              onDelete={(item) => console.log('Delete Course', item.id)}
          />
      </div>

      {/* 2. БАХШИ: НАБОР НА КУРСЫ (Агар лозим бошад, ҳамон компонентро бо маълумоти дигар истифода мебаред) */}
      <div className="mb-10">
          <SectionHeader 
              title="Набор на курсы" 
              actionLabel="Добавить" 
              onAction={() => alert('Add Course')}
          />
          <CoursesSection 
              items={coursesMockData.slice(0, 2)}
              variant="recruit"
              isLoading={false}
              onEdit={console.log}
              onDelete={console.log}
          />
      </div>

      <SectionHeader 
        title="Актуальные" 
        customRightElement="8 курсов" // Матн дар тарафи рост
      />
      <ActiveSection items={activeMockData} />
      <div className="mb-12"></div>


      <SectionHeader 
          title="Услуги" 
          actionLabel="Создать" 
          onAction={() => alert('Барои сохтани Направление')} 
      />
      <CardsSection 
        items={services}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt} // <-- 7. Функсияи навро ба ҷои 'handleDelete' медиҳем
        isLoading={isLoading}
      />

      <div className="mt-8">
        <SectionHeader 
            title="Направления" 
            actionLabel="Создать" 
            onAction={() => alert('Барои сохтани Направление')} 
        />
        
        <DirectionsSection 
            items={directionsMockData} 
            onEdit={(item) => console.log('Edit', item)}
            onDelete={(item) => console.log('Delete', item)}
        />
      </div>

      {/* 8. Модалро дар ин ҷо render мекунем */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        // Номи item-ро ба модал мефиристем
        itemName={serviceToDelete ? serviceToDelete.title : ''}
      />
    </>
  );
}