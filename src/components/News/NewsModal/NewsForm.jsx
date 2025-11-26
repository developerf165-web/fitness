import NewsFormHeader from "./NewsFormHeader";
import NewsFormBody from "./NewsFormBody";

const NewsForm = ({ onClose, onSubmit, initialData }) => {
  const isEditing = !!initialData;
  const title = isEditing ? "РЕДАКТИРОВАТЬ НОВОСТЬ" : "СОЗДАТЬ НОВОСТЬ";

  return (
          <div className="color-bg-card rounded-2xl p-2 max-w-[480px] shadow-lg">
          <NewsFormHeader title={title} />
          <NewsFormBody 
          onClose={onClose} 
          onSubmit={onSubmit} 
          initialData={initialData} 
          />
          </div>

  );
};

export default NewsForm;