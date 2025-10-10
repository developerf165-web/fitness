import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center p-10">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-lime-500"></div>
    <p className="ml-4 text-white">Загрузка...</p>
  </div>
);

export default Loader;