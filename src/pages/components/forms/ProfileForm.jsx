import React, { useState } from "react";
import InputField from "@/components/ui/InputField";
import RadioGroup from "@/components/ui/RadioGroup";
import FormButton from "@/components/ui/FormButton";

export default function ProfileForm({ onClose }) {
  const initialForm = {
    name: "Азиза",
    surname: "Султанова",
    phone: "+992 92 000 0000",
    birthday: "1995-11-15", 
    gender: "female",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Маълумоти навшуда:", form);
  };

  const isFormValid =
    form.name && form.surname && form.phone && form.birthday && form.gender;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Имя"
        name="firstName"
        value={form.name}
        onChange={handleChange("name")}
      />
      <InputField
        label="Фамилия"
        name="lastName"
        value={form.surname}
        onChange={handleChange("surname")}
      />
      <InputField
        label="Номер телефона"
        name="phone"
        value={form.phone}
        onChange={handleChange("phone")}
      />
      <InputField
        label="Дата рождения"
        name="dob"
        type="date"
        value={form.birthday}
        onChange={handleChange("birthday")}
      />

      <RadioGroup
        name="gender"
        value={form.gender}
        onChange={handleChange("gender")}
        options={[
          { label: "Мужской", value: "male" },
          { label: "Женский", value: "female" },
        ]}
      />

      <div className="flex justify-between pt-2">
        <FormButton
          type="button"
          onClick={onClose}
          className="color-bg-mini-card bg-hover-card cursor-pointer"
        >
          Отмена
        </FormButton>

        <FormButton
          type="submit"
          disabled={!isFormValid}
          className={
            isFormValid
              ? "color-bg-accent hover:bg-lime-200 cursor-pointer text-black font-semibold"
              : "color-bg-mini-card cursor-not-allowed"
          }
        >
          Сохранить
        </FormButton>
      </div>
    </form>
  );
}
