"use client";

import { v4 as uuidv4 } from "uuid";
import ContactList from "@/components/contactList";
import { useState } from "react";
import { ContactForm } from "@/components/contactForm";

export type Contact = {
  id: string;
  name: string;
  number: string;
};

export default function Home() {
  const [contactlist, setContactList] = useState<Contact[]>([]);

  const addContact = (newContact: Omit<Contact, "id">) => {
    const contactWithId: Contact = {
      ...newContact,
      id: uuidv4(),
    };
    setContactList((prev) => [...prev, contactWithId]);
  };

  const deleteContact = (idToDelete: string) => {
    setContactList((prevList) =>
      prevList.filter((contact) => contact.id !== idToDelete)
    );
  };

  const editContact = (updatedContact: Contact) => {
    setContactList((prevList) =>
      prevList.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  return (
    <div className="flex justify-evenly items-center w-full h-screen">
      <ContactForm onAdd={addContact} />
      <ContactList
        contactlist={contactlist}
        onDelete={deleteContact}
        onEdit={editContact}
      />
    </div>
  );
}
