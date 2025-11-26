// trainerService.jsx
import { authApi } from '/src/services/authAxios';

export const createTrainer = async (formData) => {
  try {
    const apiData = new FormData();

    // Mapping: Frontend -> API Fields
    apiData.append('name', formData.name);
    apiData.append('surname', formData.lastName); // lastName -> surname
    apiData.append('phone', formData.phone);
    apiData.append('courses_completed', formData.focus); // focus -> courses_completed
    // Убедитесь, что work_experience это число (integer)
    apiData.append('work_experience', parseInt(formData.experience) || 0); 
    apiData.append('color', formData.color);
    
    // Пешфарзҳо (Defaults) - Требуются API
    apiData.append('status', 1); 
    apiData.append('grade', 5.0); // Условно 5.0
    
    // Расм (File)
    if (formData.photo) {
      apiData.append('avatar', formData.photo); // photo -> avatar
    }

    // if (formData.background && formData.background.length > 0) {
    //   // ЭТОГО ПОЛЯ НЕТ В ТЕКУЩЕЙ API ДОКУМЕНТАЦИИ ДЛЯ /coaches, поэтому закомментировано.
    //   // Как только API изменится, можно раскомментировать и использовать цикл для файлов:
    //   // formData.background.forEach((file, index) => {
    //   //   apiData.append(`background_images[${index}]`, file);
    //   // });
    // }

    const response = await authApi.post('/coaches', apiData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    // ВАЖНО: Тут логируем ошибку для разработчика, но в AddTrainerModal.jsx не будем ее выводить в консоль.
    // console.error("Ошибка при создании тренера:", error);
    throw error;
  }
};