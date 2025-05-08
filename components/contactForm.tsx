import React, { useState } from "react";
import { Contact } from "@/app/page";
import { v4 as uuidv4 } from "uuid";

interface AddContactProps {
  onAdd?: (newContact: Contact) => void;
  editText?: Contact;
  setShowModal?: (value: boolean) => void;
  onEdit?: (updatedContact: Contact) => void;
}

export const ContactForm: React.FC<AddContactProps> = ({
  onAdd,
  editText,
  setShowModal,
  onEdit,
}) => {
  const [name, setName] = useState(editText?.name ?? "");
  const [number, setNumber] = useState(editText?.number ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name?.trim() || !number?.trim()) {
      alert("Both name and number are required.");
      return;
    }

    const contact: Contact = {
      id: editText?.id ?? uuidv4(),
      name,
      number,
    };

    if (editText) {
      onEdit?.(contact);
    } else {
      onAdd?.(contact);
    }

    setShowModal?.(false);
    setName("");
    setNumber("");
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border border-black p-3 rounded-xl gap-2 w-72 bg-white">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
          <label htmlFor="number" className="text-sm font-medium">
            Number
          </label>
          <input
            type="number"
            id="number"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number"
          />
          <button
            type="submit"
            className="p-3 rounded-md bg-blue-500 text-white cursor-pointer mt-2"
          >
            {editText ? "Edit Contact" : "Add Contact"}
          </button>
        </div>
      </form>
    </div>
  );
};
