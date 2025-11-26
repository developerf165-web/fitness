import React from "react";
import ContactSection from "./ContactSection";

export default function ContactSections({ contacts, onEdit, onDelete }) {
  const normalize = (data, title) => {
  const arr = Array.isArray(data) ? data : data ? [data] : [];
  return arr.map((item) => ({
    ...item,
    categoryTitle: title,
  }));
};

  return (
    <div className="grid grid-cols-1 color-bg-card rounded-2xl p-6 md:grid-cols-2 gap-8">
      <ContactSection
        title="Мобильный телефон"
        items={normalize(contacts.phone, "Мобильный телефон")}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <ContactSection
        title="Telegram"
        items={normalize(contacts.telegram, "Telegram")}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <ContactSection
        title="WhatsApp"
        items={normalize(contacts.whatsapp, "WhatsApp")}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <ContactSection
        title="Instagram"
        items={normalize(contacts.instagram, "Instagram")}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
}
