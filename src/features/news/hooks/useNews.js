import { useState, useMemo } from 'react';
import { initialNews } from '../../../data/mockNews';

export const useNews = () => {
  const [news, setNews] = useState(initialNews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const actualNews = useMemo(() => news.filter(item => item.status === 'actual'), [news]);
  const archivedNews = useMemo(() => news.filter(item => item.status === 'archived'), [news]);

  const handleOpenCreateModal = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id) => {
    const newsToEdit = news.find(item => item.id === id);
    setEditingNews(newsToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleSubmitNews = (formData) => {
    if (editingNews) {
      setNews(news.map(item => item.id === editingNews.id ? { ...item, ...formData } : item));
    } else {
      const newNewsItem = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        status: 'actual'
      };
      setNews([newNewsItem, ...news]);
    }
    handleCloseModal();
  };
  
  const handleNewsAction = (actionType, id) => {
    if (actionType === 'archive') {
      setNews(news.map(item => item.id === id ? { ...item, status: 'archived' } : item));
    }
    if (actionType === 'delete') {
      setNews(news.filter(item => item.id !== id));
    }
  };

  return {
    actualNews,
    archivedNews,
    isModalOpen,
    editingNews,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSubmitNews,
    handleNewsAction,
  };
};