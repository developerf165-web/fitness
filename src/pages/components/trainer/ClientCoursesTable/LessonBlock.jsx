import React from 'react';
import ClientTable from './ClientTable';
import { getAvatarColor } from '../../../../utils/styleUtils';
import { avatarPlaceholder } from '../../constants/tableConstants';
const LessonBlock = ({ lessonTitle, lessonData }) => (
  <React.Fragment>
    <div className="flex items-center justify-between pb-4 px-6 bg-transparent">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-700 flex items-center justify-center">
          <img src={avatarPlaceholder} alt="Тренер" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-white text-lg font-semibold">{lessonData.trainer}</p>
          <p className={`text-xs text-gray-400 ${getAvatarColor(lessonData.focus).replace('bg', 'text')}`}>
            {lessonData.focus}
          </p>
        </div>
      </div>
      <p className="text-2xl font-medium text-white">{lessonTitle}</p>
    </div>
    <ClientTable clients={lessonData.clients} />
  </React.Fragment>
);

export default LessonBlock;