import express, { Request, Response, NextFunction } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma, secretKey } from "..";
import { sign, verify } from "jsonwebtoken";
import { mailer, transport } from "../lib/nodemailer";
import mustache, { render } from "mustache";
import fs from "fs";
import { ReqUser } from "../middlewares/auth-middleware";

type TUser = {
  email: string;
};

const template = fs
  .readFileSync(__dirname + "../../templates/verify.html")
  .toString();

export const UserController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, role } = req.body;
      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.RegisteredUsersCreateInput = {
        username,
        email,
        password: hashedPassword,
        role,
      };

      const checkUser = await prisma.registeredUsers.findUnique({
        where: {
          email,
        },
      });

      if (checkUser?.id) throw Error("User already existed");

      await prisma.registeredUsers.create({
        data: newUser,
      });

      const token = sign({ email }, secretKey, {
        expiresIn: "1hr",
      });

      const rendered = mustache.render(template, {
        email,
        username,
        verify_url: process.env.verifyURL + token,
      });

      mailer({
        to: email,
        subject: "Register Successful",
        text: "",
        html: rendered,
      });

      res.send({
        success: true,
        message: "Register successful",
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;

      const user = await prisma.registeredUsers.findUnique({
        where: {
          email: String(email),
        },
      });
      if (!user) throw Error("Wrong email/password");
      const checkPassword = await compare(String(password), user.password);
      const resUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "5m",
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }

      throw Error("Email/password does not match");
    } catch (error) {
      next(error);
    }
  },
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;

      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);
      const userEditPassword: Prisma.RegisteredUsersUpdateInput = {
        password: hashedPassword,
      };
      await prisma.registeredUsers.update({
        data: userEditPassword,
        where: {
          email: String(email),
        },
      });
      res.send({
        success: true,
        message: "Password changed",
      });
    } catch (error) {
      next(error);
    }
  },

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error("Unauthorized");

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.registeredUsers.findUnique({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error("Unauthorized 2");

      const token = sign(checkUser, secretKey, {
        expiresIn: "1hr",
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  async sendMail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username } = req.query;

      const rendered = mustache.render(template, {
        email,
        username,
        verify_url: "",
      });

      mailer({
        to: String(email),
        subject: "Verify account",
        text: "",
        html: rendered,
      });

      res.send({
        message: "Email sent",
      });
    } catch (error) {
      next(error);
    }
  },

  ///// verify

  async verifyEmail(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { registeredUsers } = req;
      const verif: Prisma.RegisteredUsersUpdateInput = {
        isVerified: true,
      };
      if (registeredUsers?.isVerified) throw Error("user already verified");
      await prisma.registeredUsers.update({
        data: verif,
        where: {
          id: registeredUsers?.id,
        },
      });
      console.log("Okay");

      res.send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
};
