// import express, { Request, Response, NextFunction } from "express";
// import { Prisma } from "@prisma/client";
// import { prisma } from "..";
// import { TUser, ReqUser } from "../middlewares/auth-middleware";

// export const transactionController = {
//     async create(req: Request, res: Response, next: NextFunction) {
//       try {
//         await prisma.transaction.create({
//           data: req.body,
//         });
//         res.send({
//           success: true,
//           message: "data berhasil ditambah",
//         });
//       } catch (error) {
//         next(error);
//       }
//     },



  // async applyDiscount(prisma.event, prisma.standardTicket, prisma.discount) {
  //   try {
  //     const event = await prisma.event.findUnique({
  //       where: {
  //         id: Number(req.params.id),
  //       }
  //     })
  //     const threeMonthsBeforeEvent = new Date();
  //     threeMonthsBeforeEvent.setMonth(threeMonthsBeforeEvent.getMonth() - 3);

  //     const sevenDaysBeforeEvent = new Date();
  //     sevenDaysBeforeEvent.setDate(sevenDaysBeforeEvent.getDate() - 7);

  //     if (event && threeMonthsBeforeEvent > new Date() > sevenDaysBeforeEvent) {
  //       const discountAmount = standardTicket.price * (prisma.discount / 100)
  //       await prisma.standardTicket.update({
  //         where: {
  //           id: Number(req.params.id),
  //         }
  //         data: {
  //           ticketPrice: standardTicket.price - discountAmount,
  //         }
  //       })

  //       res.send({
  //         success: true,
  //         message: "Discount applied successfully",
  //         result: {
  //           event.id,
  //           discountAmount,
  //           newTicketPrice: event.standardTicket.ticketPrice - discountAmount,\
  //         }
  //       }
  //     )}
  //     else {
  //       res.status(400).send{
  //         success: false,
  //         message: "Discount Expired",
  //       }
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }