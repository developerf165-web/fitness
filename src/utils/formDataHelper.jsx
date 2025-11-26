export const buildUserFormData = (form, photo) => {
  const formData = new FormData();

  formData.append("username", form.phone); // username = phone
  formData.append("name", form.name);
  formData.append("surname", form.surname);
  formData.append("password", form.phone); // ё худ пароли дигар
  formData.append("mobile_id", 1); // 1 = Android, 2 = iOS
  formData.append("gender", form.gender === "male" ? 1 : 2);
  formData.append("birthday", form.birthday);
  formData.append("age", form.age);
  formData.append("weight", form.weight);
  formData.append("height", form.height);

  if (photo) formData.append("img", photo);

  return formData;
};
