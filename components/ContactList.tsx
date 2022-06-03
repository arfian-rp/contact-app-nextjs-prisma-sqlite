import Image from "next/image";
import React from "react";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  onDel: () => void;
}
export default function Contact({ avatar, firstName, email, lastName, onDel }: Props) {
  return (
    <div className="flex justify-between px-10 border-2 border-black bg-white py-2">
      <div className="flex items-center">
        <Image className="rounded-full bg-contain" src={avatar} width={70} height={70} />
      </div>
      <div className="flex flex-col items-center font-semibold">
        <div className="text-xl">
          {firstName} {lastName}
        </div>
        <div className="text-lg">{email}</div>
      </div>
      <button className="text-xl" onClick={onDel}>
        ❌
      </button>
    </div>
  );
}
