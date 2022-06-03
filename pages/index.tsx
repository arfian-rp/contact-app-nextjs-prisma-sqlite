import { Contact, Prisma, PrismaClient } from "@prisma/client";
import Head from "next/head";
import React, { useState } from "react";
import ContactList from "../components/ContactList";
import FormContact from "../components/FormContact";

const prisma = new PrismaClient();

interface Props {
  initialContacts: Contact[];
}
export default function Home({ initialContacts }: Props) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  async function saveContact(contact: Prisma.ContactCreateInput) {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  async function deleteContact(id: string) {
    const response = await fetch("/api/contact", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  }

  return (
    <>
      <Head>
        <title>Contact App</title>
      </Head>
      <div className="flex h-[100vh]">
        <div className="bg-purple-800 w-[45vw]">
          <FormContact
            onSave={async (data: any) => {
              await saveContact(data);
              await setContacts([...contacts, data]);
            }}
          />
        </div>
        <div className="bg-purple-300 w-[55vw]">
          {contacts.map(({ avatar, email, id, firstName, lastName }, i) => (
            <ContactList
              key={i}
              avatar={avatar}
              email={email}
              firstName={firstName}
              lastName={lastName}
              onDel={async () => {
                await deleteContact(id);
                await setContacts(contacts.filter((e) => e.id !== id));
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const contacts: Contact[] = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts,
    },
  };
}
