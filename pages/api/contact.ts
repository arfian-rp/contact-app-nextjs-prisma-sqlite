import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
  }

  switch (req.method) {
    case "POST":
      try {
        const contact: Prisma.ContactCreateInput = JSON.parse(req.body);
        const savedContact = await prisma.contact.create({ data: contact });
        res.status(200).json(savedContact);
      } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
      }
      break;
    case "DELETE":
      try {
        const deletedContact = await prisma.contact.delete({ where: { id: JSON.parse(req.body).id } });
        res.status(200).json(deletedContact);
      } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
      }
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};
