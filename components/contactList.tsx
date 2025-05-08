"use client";

import { Contact } from "@/app/page";
import { useState } from "react";
import { ContactForm } from "./contactForm";

interface ContactListProps {
  contactlist: Contact[];
  onDelete: (numberToDelete: string) => void;
  onEdit: (updatedContact: Contact) => void;
}

export default function ContactList({
  contactlist,
  onDelete,
  onEdit,
}: ContactListProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editContact, setEditContact] = useState<Contact>();

  return (
    <div className="flex flex-col gap-4 w-3xl border p-4 rounded-md h-[450px]">
      <div className="text-lg font-bold">Contact List</div>
      <div
        className={`flex flex-col gap-2 h-[370px] overflow-y-auto overflow-x-hidden border rounded-md p-4 relative`}
      >
        {contactlist.length > 0 &&
          contactlist.map((contact: Contact) => (
            <div
              key={contact.number}
              className="flex gap-4 px-4 py-2 border rounded"
            >
              <span>{contact.name}</span>
              <span>{contact.number}</span>
              <div className="ml-auto space-x-4">
                <button
                  className="cursor-pointer font-semibold text-amber-500"
                  onClick={() => {
                    setShowEditModal(true);
                    setEditContact(contact);
                  }}
                >
                  Edit
                </button>
                <button
                  className="cursor-pointer font-semibold text-red-500"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        {contactlist.length === 0 && (
          <div className="flex h-full justify-center items-center font-bold text-2xl">
            NO CONTACTS YET
          </div>
        )}

        {showEditModal && (
          <div className="absolute inset-0 bg-gray-800/20 bg-opacity-50 z-20 flex justify-center items-center">
            <ContactForm
              editText={editContact}
              setShowModal={setShowEditModal}
              onEdit={onEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
