import React, { useState } from "react";
import ScrollableModalContentWrapper from "@/components/Shared/ScrollableModalContentWrapper";
import AvatarUpload from "/src/components/ui/AvatarUpload";
import InputField from "/src/components/ui/InputField";
import RadioGroup from "/src/components/ui/RadioGroup";
import FormButton from "/src/components/ui/FormButton";
import FormSection from "/src/components/ui/FormSection";
import { createUser } from "@services/Dashboard/apiAddUser";
import { buildUserFormData } from "/src/utils/formDataHelper";
import { useToast } from "@/components/Toast/ToastContext";

// onSuccess-ро ҳамчун prop қабул мекунем
export default function AddUserCard({ onClose, onSuccess }) {
  const initialForm = {
    name: "",
    surname: "",
    phone: "",
    birthday: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  };

  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { showToast } = useToast();

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = buildUserFormData(form, photo);
      const data = await createUser(formData);

      const toastMessage = {
        type: 'success',
        title: "Пользователь добавлен",
        message: `Клиент ${form.name} ${form.surname} успешно зарегистрирован.`,
      };

      // ✅ 1. onSuccess-ро даъват мекунем, ки дар Dashboard маълумотро нав мекунад
      if (onSuccess) {
        onSuccess(toastMessage);
      } else {
        // Агар onSuccess набошад, танҳо тоаст-ро нишон медиҳем
        showToast(toastMessage.type, toastMessage.title, toastMessage.message);
      }

      // ✅ 2. onClose-ро даъват мекунем
      setForm(initialForm);
      setPhoto(null);
      onClose();

    } catch (err) {
      setMessage(`❌ Ошибка: ${err.message || "Не удалось создать пользователя"}`);
      // Агар хатогӣ бошад, тоаст-ро нишон медиҳем
      showToast(
        'error',
        "Ошибка создания",
        err.message || "Произошла сетевая ошибка."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.name &&
    form.surname &&
    form.phone &&
    form.birthday &&
    form.weight &&
    form.height &&
    form.age &&
    form.gender;

  const modalContent = (
    <div className="space-y-6">
      <AvatarUpload photo={photo} setPhoto={setPhoto} />

      <FormSection>
        <InputField label="Имя*" placeholder="Введите имя" value={form.name} onChange={handleChange("name")} />
        <InputField label="Фамилия*" placeholder="Введите фамилию" value={form.surname} onChange={handleChange("surname")} />
        <InputField label="Номер телефона*" placeholder="Введите номер телефона" value={form.phone} onChange={handleChange("phone")} />
        <InputField label="Дата рождения*" type="date" value={form.birthday} onChange={handleChange("birthday")} />
      </FormSection>

      <RadioGroup
        name="gender"
        value={form.gender}
        onChange={handleChange("gender")}
        options={[
          { label: "Мужской", value: "male" },
          { label: "Женский", value: "female" },
        ]}
      />

      <FormSection className="grid grid-cols-3 gap-3">
        <InputField label="Возраст" type="number" value={form.age} onChange={handleChange("age")} />
        <InputField label="Рост" type="number" value={form.height} onChange={handleChange("height")} />
        <InputField label="Вес" type="number" value={form.weight} onChange={handleChange("weight")} />
      </FormSection>

      {message && <p className="text-center mt-3 text-sm color-accent">{message}</p>}
    </div>
  );

  const modalFooter = (
    <>
      <FormButton
        onClick={onClose}
        className="color-bg-mini-card bg-hover-card cursor-pointer"
      >
        Отмена
      </FormButton>

      <FormButton
        onClick={handleSubmit}
        disabled={!isFormValid || loading}
        className={
          isFormValid
            ? "color-bg-accent hover:bg-lime-200 cursor-pointer text-black font-semibold"
            : "color-bg-mini-card cursor-not-allowed"
        }
      >
        {loading ? "Загрузка..." : "Добавить"}
      </FormButton>
    </>
  );

  return (
    <ScrollableModalContentWrapper
      title="ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ"
      content={modalContent}
      footer={modalFooter}
      onClose={onClose}
    />
  );
}