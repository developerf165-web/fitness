import React from "react";
import ContactItem from "./ContactItem";

export default function ContactSection({ title, items, onEdit, onDelete }) {
  return (
    <div>
      <h3 className="font-bold mb-3">{title}</h3>

      <div className="space-y-2">
        {items.map((item) => (
          <ContactItem
            key={item.id}
            icon={item.icon}
            text={item.text}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        ))}
      </div>
    </div>
  );
}
