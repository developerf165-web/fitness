import React, { useState } from "react";
import Card from "@/components/ui/Card";
import AvatarUpload from "@/components/ui/AvatarUpload";
import InputField from "@/components/ui/InputField";
import RadioGroup from "@/components/ui/RadioGroup";
import FormButton from "@/components/ui/FormButton";
import FormSection from "@/components/ui/FormSection";

export default function AddUserCard({ onClose }) {
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

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    console.log("Submitted form:", { ...form, photo });
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent-blur">
      <Card title="ДОБАВИТЬ ПОЛЬЗОВАТЕЛЯ">
        <AvatarUpload photo={photo} setPhoto={setPhoto} />

        <FormSection>
          <InputField
            label="Имя*"
            placeholder="Введите имя"
            value={form.name}
            onChange={handleChange("name")}
          />
          <InputField
            label="Фамилия*"
            placeholder="Введите фамилию"
            value={form.surname}
            onChange={handleChange("surname")}
          />
          <InputField
            label="Номер телефона*"
            placeholder="Введите номер телефона"
            value={form.phone}
            onChange={handleChange("phone")}
          />
          <InputField
            label="Дата рождения*"
            type="date"
            value={form.birthday}
            onChange={handleChange("birthday")}
          />
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
          <InputField
            label="Возраст"
            type="number"
            value={form.age}
            onChange={handleChange("age")}
          />
          <InputField
            label="Рост"
            type="number"
            value={form.height}
            onChange={handleChange("height")}
          />
          <InputField
            label="Вес"
            type="number"
            value={form.weight}
            onChange={handleChange("weight")}
          />
        </FormSection>

        <div className="flex justify-between">
          <FormButton
            onClick={onClose}
            className="color-bg-mini-card bg-hover-card cursor-pointer"
          >
            Отмена
          </FormButton>

          <FormButton
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={
              isFormValid
                ? "color-bg-accent hover:bg-lime-200 cursor-pointer text-black font-semibold"
                : "color-bg-mini-card cursor-not-allowed"
            }
          >
            Добавить
          </FormButton>
        </div>
      </Card>
    </div>
  );
}
