import React from 'react';
import Modal from '../components/ui/Modal';
import NewsSection from '../../components/News/NewsSection';
import NewsForm from '../../components/News/NewsModal/NewsForm';
import { useNews } from '../../features/news/hooks/useNews';

function NewsPage() {
  const {
    actualNews,
    archivedNews,
    isModalOpen,
    editingNews,
    handleOpenCreateModal,
    handleCloseModal,
    handleSubmitNews,
    handleNewsAction, 
  } = useNews();

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold text-white mt-8 mb-8">Новости</h1>
      <NewsSection
        title="Актуальные"
        items={actualNews}
        showCreateCard={true}
        onCreate={handleOpenCreateModal}
        onAction={handleNewsAction} 
      />
      <NewsSection
        title="Архив"
        items={archivedNews}
        onAction={handleNewsAction} 
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <NewsForm
          onSubmit={handleSubmitNews}
          initialData={editingNews}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default NewsPage;