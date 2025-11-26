import React from 'react'

export default function ServicesHeader() {
          return (
                    <div className='w-full flex py-6 justify-between items-center'>
                              <div className='font-bold text-white text-2xl rounded-2xl'>
                                        <h1>Услуги</h1>
                              </div>
                              <div className='font-bold text-black color-bg-accent text-md p-3 px-6 rounded-xl cursor-pointer'>
                                        <button className='cursor-pointer'>
                                                  Создать
                                        </button>
                              </div>

                    </div>
          );
}