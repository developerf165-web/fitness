import React from 'react';
import ProfilePicture from './ProfilePicture';
import Button from '/src/components/ui/Button';

/**
 * @param {object} props
 * @param {object} props.user - Маълумоти корбар
 * @param {function} props.onChangePasswordClick - Функсия барои иваз кардани парол
 */
export default function ProfileDisplayCard({ user, onChangePasswordClick }) {
  
  // Функсияи холӣ барои таҳрири сурат (шумо метавонед онро баъдтар илова кунед)
  const handleEditPicture = () => {
    alert('Функсияи таҳрири сурат дар ин ҷо илова карда мешавад.');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 color-bg-card rounded-2xl">
      <ProfilePicture
        imageUrl={user.imageUrl}
        onEditClick={handleEditPicture}
      />
      <h2 className="text-3xl font-bold text-white mt-8">
        {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
      </h2>
      <p className="text-lg font-medium color-accent mt-1">
        {user.role}
      </p>
      <div className="w-full mt-4 flex flex-col items-center">
        <Button 
          variant="primary" 
          onClick={onChangePasswordClick}
        >
          Изменить пароль
        </Button>
      </div>
    </div>
  );
}