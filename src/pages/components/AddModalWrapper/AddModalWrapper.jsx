import React, { useEffect } from "react";
import AddUserCard from "/src/pages/components/Cards/AddUserCard/AddUserCard";
import AddTrainerModal from "../Cards/Modal/AddTrainerModal";

const AddModalWrapper = ({ type, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/10 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="rounded-2xl shadow-lg text-white relative max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {type === "user" ? (
          <AddUserCard onClose={onClose} />
        ) : type === "trainer" ? (
          <AddTrainerModal
            isOpen={true}
            onClose={onClose}
            onAddTrainer={() => {}}
          />
        ) : null}
      </div>
    </div>
  );
};

export default AddModalWrapper;
