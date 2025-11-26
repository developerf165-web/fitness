// --- Initial data without JSX icons --- //

export const initialClubInfo = {
  activity: "FITNESS",
  description:
    "Фитнес-клуб — место, сочетающее в себе спортивный зал для проведения групповых и танцевальных программ, спортивный зал для игровых видов спорта (не во всех фитнес-клубах), тренажёрный зал, плавательный бассейн (не во всех фитнес-клубах; для спортивного плавания и аквааэробики), кардио-зону, залы аэробики.",
};

export const initialContacts = {
  phone: [
    { id: "p1", type: "phone", text: "Call центр", icon: "BsTelephoneFill" },
    { id: "p2", type: "phone", text: "+992 92 000 00 00", icon: "BsTelephoneFill" },
  ],

  telegram: [
    { id: "t1", type: "telegram", text: "+992 92 000 00 00", icon: "BsTelegram" },
    { id: "t2", type: "link", text: "https://t.me/", icon: "BsLink45Deg" },
  ],

  whatsapp: [
    { id: "w1", type: "whatsapp", text: "+992 92 000 00 00", icon: "BsWhatsapp" },
    { id: "w2", type: "link", text: "https://wa.me/", icon: "BsLink45Deg" },
  ],

  instagram: [
    { id: "i1", type: "instagram", text: "fitness", icon: "BsInstagram" },
    { id: "i2", type: "link", text: "www.instagram.com/", icon: "BsLink45Deg" },
  ],
};

export const modalConfigs = {
  phone: { title: "РЕДАКТИРОВАТЬ НОМЕР ТЕЛЕФОНА", label: "Номер телефона*" },
  telegram: { title: "РЕДАКТИРОВАТЬ НОМЕР TELEGRAM", label: "Номер Telegram*" },
  whatsapp: { title: "РЕДАКТИРОВАТЬ НОМЕР WHATSAPP", label: "Номер WhatsApp*" },
  instagram: { title: "РЕДАКТИРОВАТЬ INSTAGRAM", label: "Логин Instagram*" },
  link: { title: "РЕДАКТИРОВАТЬ ССЫЛКУ", label: "Ссылка*" },
};
