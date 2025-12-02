// trainerService.jsx
import { authApi } from '/src/services/authAxios';

export const createTrainer = async (formData) => {
  try {
    const apiData = new FormData();

    // Mapping: Frontend -> API Fields
    apiData.append('name', formData.name);
    apiData.append('surname', formData.lastName); // lastName -> surname
    apiData.append('phone', formData.phone);
    
    // 🔧 direction_id - САНҶИШИ ҲАМАИ ВАРИАНТҲО
    // Агар яке кор накард, дигараро санҷед!
    
    if (formData.focus && Array.isArray(formData.focus)) {
      // ВАРИАНТ 1: Як-як бо индекс (PHP стандарт)
      // direction_id[0]=1&direction_id[1]=2&direction_id[2]=3
      formData.focus.forEach((directionId, index) => {
        apiData.append(`direction_id[${index}]`, directionId.toString());
      });
      
      // Агар Вариант 1 кор накард, комментарияро тағир диҳед:
      
      // ВАРИАНТ 2: Якчанд бор ҳамон ном (Laravel стандарт)
      // formData.focus.forEach((directionId) => {
      //   apiData.append('direction_id[]', directionId.toString());
      // });
      
      // ВАРИАНТ 3: JSON string
      // apiData.append('direction_id', JSON.stringify(formData.focus));
    }
    
    // work_experience - бояд integer бошад
    apiData.append('work_experience', parseInt(formData.experience) || 0); 
    
    // 🎨 color - Табдили Tailwind class ба hex color
    let cleanColor = formData.color;
    
    // Map-и пурраи рангҳои Tailwind ба hex
    const colorMap = {
      'bg-red-600': '#dc2626',
      'bg-pink-600': '#db2777',
      'bg-orange-500': '#f97316',
      'bg-red-400': '#f87171',
      'bg-lime-500': '#84cc16',
      'bg-lime-600': '#65a30d',
      'bg-green-600': '#16a34a',
      'bg-teal-500': '#14b8a6',
      'bg-cyan-500': '#06b6d4',
      'bg-blue-600': '#2563eb',
      'bg-indigo-500': '#6366f1',
      'bg-violet-600': '#7c3aed',
      'bg-purple-600': '#9333ea',
      'bg-fuchsia-500': '#d946ef',
      'bg-rose-500': '#f43f5e',
      'bg-amber-400': '#fbbf24'
    };
    
    // Агар Tailwind class бошад, ба hex табдил медиҳем
    if (colorMap[cleanColor]) {
      cleanColor = colorMap[cleanColor];
    } else if (!cleanColor.startsWith('#')) {
      // Агар на Tailwind ва на hex бошад, default red
      cleanColor = '#dc2626';
    }
    
    apiData.append('color', cleanColor);
    
    // Пешфарзҳо
    apiData.append('status', 1); 
    apiData.append('grade', 5.0);
    
    // Расм (File) - ҲАТМИСТ
    if (formData.photo) {
      apiData.append('avatar', formData.photo);
    }
    
    // Background images - ҲАТМАН фиристодан (ҳатто агар холӣ бошад!)
    // Backend интизори майдони cover_img аст, агар надиҳем 500 медиҳад
    if (formData.background && formData.background.length > 0) {
      formData.background.forEach((file, index) => {
        apiData.append(`cover_img[${index}]`, file);
      });
    } else {
      // Агар расм набошад, майдони холӣ мефиристем
      // Ин backend-ро аз 500 error наҷот медиҳад
      apiData.append('cover_img', '');
    }

    // 🐛 DEBUG: Танҳо агар logging фаъол бошад
    // Барои фаъол кардан: VITE_API_LOGGING_ENABLED=true дар .env
    if (import.meta.env.VITE_API_LOGGING_ENABLED === 'true') {
      console.log('📤 Отправка данных тренера:');
      for (let [key, value] of apiData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}:`, `[FILE: ${value.name}, ${value.size} bytes]`);
        } else {
          console.log(`  ${key}:`, value);
        }
      }
    }

    const response = await authApi.post('/coach/create', apiData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error("❌ Ошибка при создании тренера:", error);
    
    // Муфассалтар логгирование барои таҳлил
    if (error.response) {
      console.error("📛 Ответ сервера:", error.response.status, error.response.data);
      error.statusCode = error.response.status;
      error.responseData = error.response.data;
    }
    
    throw error;
  }
};
