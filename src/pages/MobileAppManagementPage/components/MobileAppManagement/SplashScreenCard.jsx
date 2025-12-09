import React from 'react';
import Card from '/src/components/ui/Card'; // Истифодаи Card.jsx-и шумо
import Button from '/src/components/ui/Button'; // Истифодаи Button.jsx-и шумо



export default function SplashScreenCard() {
  return (
    // Мо Card.jsx-и шуморо истифода мебарем, ки он w-[400px] дорад
    <Card title="Splash Screen">
      
      {/* Қисми контент бо сурат */}
      <div className="flex flex-col items-center">
        <img 
          src="/images/splash-preview.png" // Истифодаи сурати намунавӣ
          alt="Splash Screen Preview" 
          className="w-[200px] h-auto object-contain mb-4" // Андозаи суратро мувофиқ кунед
        />
        
        <div className="text-xs text-gray-400 text-center mb-6">
          <p>Минимальный размер: 393х852 px</p>
          <p>Максимальное кол-во фотографий: 1</p>
        </div>

        {/* Тугмаҳо */}
        <div className="flex justify-between w-full gap-3">
          <Button 
            variant="primary" 
            onClick={() => console.log('Добавить Splash')}
            className="flex-1" // Барои пуррагии васеъ
          >
            Добавить
          </Button>
          
          <Button 
            variant="default" 
            onClick={() => console.log('Сохранить Splash')}
            className="flex-1" // Барои пуррагии васеъ
          >
            Сохранить
          </Button>
        </div>
      </div>

    </Card>
  );
}