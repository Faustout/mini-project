import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma, secretKey } from "..";
import { Prisma } from "@prisma/client";

export type TUser = {
  id: number;
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
};

export interface ReqUser extends Request {
  registeredUsers?: TUser;
}

export const verifyUser = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw Error("unauthorized");

    const verifyToken = verify(String(token), secretKey) as TUser;

    const registeredUsers = (await prisma.registeredUsers.findUnique({
      where: {
        email: verifyToken?.email,
      },
    })) as TUser;
    if (!registeredUsers.id) throw Error("not found");
    req.registeredUsers = registeredUsers as TUser;
    next();
  } catch (err) {
    next(err);
  }
};

export const verifyEO = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { registeredUsers } = req;
    if (registeredUsers?.role !== "EO") throw Error("EO only");
    next();
  } catch (error) {
    next(error);
  }
};
