import { useState, useEffect } from 'react';
import NewsFormFooter from './NewsFormFooter';
import RadioGroup from '../../../pages/components/ui/RadioGroup';

const labelStyle = "block text-sm font-medium color-accent pl-2 mb-2";
const inputStyle = "block w-full text-gray-400 color-bg-mini-card border-transparent rounded-lg p-3 focus:outline-none focus:ring-2 focus:color-accent";



const NewsFormBody = ({ onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [channel, setChannel] = useState('push'); // <--- 2. Истифодаи ҳолати ягона барои канал
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPublicationDate(initialData.publicationDate || '');
      setEndDate(initialData.endDate || '');
      if (initialData.sendSms) {
        setChannel('sms');
      } else {
        setChannel('push'); 
      }
      setImageUrl(initialData.imageUrl || '');
      setImage(null);
    } else {
      setTitle('');
      setDescription('');
      setPublicationDate('');
      setEndDate('');
      setChannel('push'); 
      setImageUrl('');
      setImage(null);
    }
  }, [initialData]);

  useEffect(() => {
    const isValid = title.trim() !== '' &&
                      description.trim() !== '' &&
                      publicationDate.trim() !== '' &&
                      endDate.trim() !== '';
    setIsFormValid(isValid);
  }, [title, description, publicationDate, endDate]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return; 
    
    const dataToSend = {
      title,
      description,
      publicationDate,
      endDate,
      sendPush: channel === 'push',
      sendSms: channel === 'sms',
      image,
      imageUrl
    };
    
    onSubmit(dataToSend);
  };

  const channelOptions = [
    { value: 'push', label: 'Push уведомление' },
    { value: 'sms', label: 'SMS сообщение' },
  ];

  return (
    <div className="flex-1 px-2 w-full max-h-[70vh] overflow-y-auto custom-scrollbar">
      <form id="news-form" onSubmit={handleSubmit} className="px-6 space-y-5">
        
        <div className="flex items-center space-x-4">
          {imageUrl && <img src={imageUrl} alt="Preview" className="w-44 h-28 rounded-lg object-cover" />}
          <label className="flex flex-col shrink-0 justify-center items-center w-44 h-28 color-bg-mini-card border-gray-500 rounded-xl cursor-pointer bg-hover-card">
          <span className="flex items-center justify-center w-6 h-6 text-2xl rounded-full color-bg-accent text-black">
            +
          </span>
            <span className="text-xs text-center text-gray-400 px-2">Добавить фото</span>
            <span className="text-xs text-center text-gray-400 px-2">Минимальный размер 340x180 px</span>
            <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
          </label>
        </div>

        <div>
          <label className={labelStyle}>Заголовок<span className="color-accent">*</span></label>
          <input type="text" placeholder="Введите заголовок" className={`${inputStyle} ${title ? 'text-white' : 'text-gray-400'}`} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label className={labelStyle}>Описание<span className="color-accent">*</span></label>
          <textarea placeholder="Введите описание" rows="4" className={`${inputStyle} resize-none ${description ? 'text-white' : 'text-gray-400'}`} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <label className={labelStyle}>Дата публикации<span className="color-accent">*</span></label>
            <input type="date" className={`${inputStyle} ${title ? 'text-white' : 'text-gray-400'}`} value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
          </div>
          <div className="w-full sm:w-1/2 mt-5 sm:mt-0">
            <label className={labelStyle}>Дата окончания<span className="color-accent">*</span></label>
            <input type="date" className={`${inputStyle} ${title ? 'text-white' : 'text-gray-400'}`} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <RadioGroup
          label="Канал"
          name="channel"
          options={channelOptions}
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />

      </form>
      <NewsFormFooter onClose={onClose} isFormValid={isFormValid} isEditing={isEditing} />
    </div>
  );
};

export default NewsFormBody;