import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existedUser = await prisma.user.findFirst({ where: { email } });
    if (existedUser) {
      return res.status(400).json({ error: "user already exists" });
    }
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "User registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  res.json({ message: "Login successful", token });
};
