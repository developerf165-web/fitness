import React, { useState, useEffect } from 'react';
import { Briefcase, Home } from 'lucide-react';
import DropdownMenu from '@/components/ui/DropdownMenu';
import Modal from '@/components/ui/Modal';
import TrainerModal from '../Cards/Modal/TrainerModal';

import headerBg from '/images/fitness1.jpg';
import profileMain from '/images/image1.jpg';

const UserProfileCard = ({ trainerData, onUpdate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [status, setStatus] = useState(trainerData?.status === 1 ? "На работе" : "На карантине");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Update status when trainerData changes
  useEffect(() => {
    if (trainerData) {
      setStatus(trainerData.status === 1 ? "На работе" : "На карантине");
    }
  }, [trainerData]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Use covers from API or fallback to default images
  const bgImages = trainerData?.covers?.length > 0
    ? trainerData.covers.map(cover => `http://84.54.31.36:8081/${cover.path}`)
    : [headerBg, headerBg, headerBg];

  const totalSlides = bgImages.length;

  const imageTranslate = `translateX(-${(currentSlide * 100) / totalSlides}%)`;

  const menuItems = [
    {
      label: "На работе",
      icon: <Briefcase size={16} />,
      action: () => setStatus("На работе"),
    },
    {
      label: "На карантине",
      icon: <Home size={16} />,
      action: () => setStatus("На карантине"),
    },
  ];

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateSuccess = (updatedData) => {
    console.log('Trainer updated:', updatedData);
    setIsEditModalOpen(false);
    if (onUpdate) {
      onUpdate();
    }
  };

  // Prepare initial data for edit modal
  const editInitialData = trainerData ? {
    id: trainerData.id,
    name: trainerData.name,
    lastName: trainerData.surname,
    phone: trainerData.phone,
    focus: trainerData.directions?.map(d => d.id) || [],
    experience: trainerData.work_experience,
    photo: trainerData.avatar ? `http://84.54.31.36:8081/${trainerData.avatar}` : null,
    background: trainerData.covers || [],
    color: trainerData.color,
  } : null;

  // Display data
  const displayName = trainerData ? `${trainerData.name} ${trainerData.surname}` : "Loading...";
  const displayTitle = trainerData?.directions?.length > 0
    ? trainerData.directions.map(d => d.title).join(', ')
    : "Тренер";
  const displayPhone = trainerData?.phone || "";
  const displayAvatar = trainerData?.avatar
    ? `http://84.54.31.36:8081/${trainerData.avatar}`
    : profileMain;

  return (
    <div className="w-full mx-auto text-white shadow-2xl relative">
      <div>
        <div className="h-80 rounded-3xl m-0 relative overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ width: `${totalSlides * 100}%`, transform: imageTranslate }}
          >
            {bgImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Тренажерный зал ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ width: `${100 / totalSlides}%` }}
              />
            ))}
          </div>

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {bgImages.map((_, index) => (
              <span
                key={index}
                className={`
                  block w-2.5 h-2.5 rounded-full cursor-pointer
                  transition-colors duration-300
                  ${currentSlide === index ? 'bg-white' : 'bg-gray-400 opacity-60'}
                `}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>

        <div className="absolute top-60 left-15 z-20">
          <div className="
            w-30 h-30 rounded-full overflow-hidden 
            outline-6 outline-(--color-accent)
          ">
            <img
              src={displayAvatar}
              alt="Акси асосии профили"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 color-bg-card rounded-2xl">
        <div className="px-10 pt-8 min-h-32">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1">
              <h1 className="text-xl mr-2 font-bold color-accent">
                {displayName}
              </h1>
              <button onClick={handleEditClick} className="cursor-pointer">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.2969 8.4589L16.4833 2.70548L18.3984 0.787671C18.9228 0.262557 19.5671 0 20.3313 0C21.0955 0 21.7393 0.262557 22.2628 0.787671L24.1778 2.70548C24.7022 3.23059 24.9758 3.86438 24.9986 4.60685C25.0214 5.34931 24.7706 5.98265 24.2462 6.50685L22.2969 8.4589ZM20.3135 10.4795L5.81362 25H0V19.1781L14.4999 4.65753L20.3135 10.4795Z"
                    fill="#3A3A3C"
                  />
                </svg>
              </button>
            </div>

            <DropdownMenu items={menuItems}>
              <button className="cursor-pointer text-gray-400 hover:text-white transition">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="flex flex-col">
                    <circle cx="12" cy="5" r="1.5"></circle>
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="12" cy="19" r="1.5"></circle>
                  </g>
                </svg>
              </button>
            </DropdownMenu>
          </div>

          <p className="text-gray-200">{displayTitle}</p>

          <div className="flex justify-between items-center">
            <p className="text-gray-400">{status}</p>

            <a
              href={`tel:${displayPhone.replace(/\s/g, '')}`}
              className="text-lg font-semibold color-accent hover:text-lime-300 transition"
            >
              {displayPhone}
            </a>
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
        <TrainerModal
          mode="edit"
          initialData={editInitialData}
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onAddTrainer={handleUpdateSuccess}
        />
      </Modal>
    </div>
  );
};

export default UserProfileCard;
