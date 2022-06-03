import { Prisma } from "@prisma/client";
import React, { useState } from "react";

interface Props {
  onSave: (data: Prisma.ContactCreateInput) => void;
}
export default function FormContact({ onSave }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>("");

  function save() {
    if (file.size <= 1000000) {
      const reader = new FileReader();
      reader.onload = function () {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    } else alert("Error");
    if (firstName && lastName && email && avatar) {
      onSave({
        firstName,
        lastName,
        email,
        avatar,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setFile(null);
    } else alert("Error");
  }

  return (
    <div className="flex flex-col gap-6 items-center mt-[40vh] -translate-y-[50%] text-lg font-sans ">
      <div className="text-white text-2xl">Form Add Contact</div>
      <div>
        <label htmlFor="f" className="text-white">
          firstName:
        </label>
        <input type="text" id="f" className="rounded-md text-center" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
      </div>
      <div>
        <label htmlFor="l" className="text-white">
          lastName:
        </label>
        <input type="text" id="l" className="rounded-md text-center" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="e" className="text-white">
          email:
        </label>
        <input type="email" id="e" className="rounded-md text-center" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <input id="a" className="text-white" type="file" accept="image/*" onChange={(e) => setFile(e.target.files![0])} />

      <button className="border-2 border-white text-white rounded-md px-20 py-1 hover:bg-white hover:text-purple-800 transition duration-300 ease-in-out text-lg" onClick={save}>
        Save
      </button>
    </div>
  );
}
