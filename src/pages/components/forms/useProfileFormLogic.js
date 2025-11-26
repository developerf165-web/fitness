import { useState, useMemo, useCallback, useEffect } from "react";
import { updateUserProfile, getUserProfile } from "/src/services/ClientProfile/profileService";
import { useToast } from "/src/pages/components/Toast/ToastContext";

const GENDER_MAP = {
  male: 1,
  female: 2,
  1: "male",
  2: "female"
};


export const useProfileFormLogic = ({ userId, onClose, onUpdateSuccess, refetchProfile }) => {
  const [form, setForm] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [initialPhotoUrl, setInitialPhotoUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setFormError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const id = userId;
      if (!id) {
        setFormError("User ID is missing.");
        setIsLoading(false);
        return;
      }
      try {
        const data = await getUserProfile(id);
        const rawImgUrl = data.img;
        const isBadPlaceholder = rawImgUrl && rawImgUrl.includes("via.placeholder.com");
        if (rawImgUrl && !isBadPlaceholder) {
          setInitialPhotoUrl(rawImgUrl);
        }
        setForm({
          name: data.name || "",
          surname: data.surname || "",
          username: data.username || "",
          birthday: data.birthday || "",
          gender: GENDER_MAP[data.gender] || "male",
          age: data.age || "",
          weight: data.weight || "",
          height: data.height || "",
          mobile_id: data.mobile_id || 1
        });
      } catch (err) {
        setFormError(err.message || "Ошибка при загрузке данных профиля.");
        setForm({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = useCallback(
    (field) => (e) => setForm((prevForm) => ({ ...prevForm, [field]: e.target.value })),
    []
  );

  const isFormValid = useMemo(
    () => form && form.name && form.surname && form.username && form.gender,
    [form]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isFormValid || isProcessing) return;
      setIsProcessing(true);
      setFormError(null);
      const id = userId;
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("surname", form.surname);
      formData.append("gender", GENDER_MAP[form.gender]);
      formData.append("age", form.age);
      formData.append("weight", form.weight);
      formData.append("height", form.height);
      formData.append("mobile_id", form.mobile_id);
      if (photo) formData.append("img", photo);
      try {
        const response = await updateUserProfile(id, formData);
        await refetchProfile?.();
        onUpdateSuccess(response);
        showToast("success", "Успешно!", "Профиль успешно обновлён!");
        onClose();
      } catch (err) {
        setFormError(err.message || "Ошибка при сохранении данных профиля.");
      } finally {
        setIsProcessing(false);
      }
    },
    [form, photo, isFormValid, isProcessing, onClose, onUpdateSuccess, userId, refetchProfile, showToast]
  );

  return {
    form,
    isLoading,
    handleChange,
    handleSubmit,
    isFormValid,
    isProcessing,
    formError,
    photo,
    setPhoto,
    initialPhotoUrl
  };
};
