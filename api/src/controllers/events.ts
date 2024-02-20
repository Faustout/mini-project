import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/auth-middleware";

export const EventController = {
  ////get event
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventName } = req.query;
      const events = await prisma.event.findMany({
        include: {
          registeredUsers: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
        where: {
          eventName: {
            contains: String(eventName),
          },
        },
      });

      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },

  // get by id
  async getEventById(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await prisma.event.findUnique({
        include: {
          registeredUsers: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
        where: {
          id: Number(req.params.id),
        },
      });

      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },

  ////add new event
  async addEvent(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const {
        eventName,
        time,
        venue,
        image_url,
        description,
        categoryId,
        price,
        type,
        availableSeat,
      } = req.body;
      const newEvent: Prisma.EventCreateInput = {
        eventName,
        time,
        venue,
        image_url: req.file?.filename,
        description,
        eventCategory: {
          connect: {
            id: Number(categoryId),
          },
        },
        registeredUsers: {
          connect: {
            id: req.registeredUsers?.id,
          },
        },
      };

      const newTicketPrice: Prisma.StandardTicketCreateInput = {
        ticketPrice: Number(price),
        availableSeat: Number(availableSeat),
      };

      if (type === "Standard")
        await prisma.standardTicket.create({
          data: newTicketPrice,
        });
      else
        prisma.vIPTicket.create({
          data: newTicketPrice,
        });

      // await  prisma.standardTicket.create({

      //     ,
      //   });
      // } else if (type === "VIP") {
      //   newEvent.vipTicket = {
      //     Event: {
      //       data: [
      //         {
      //           ticketPrice: Number(price),
      //           availableSeat: Number(availableSeat),
      //         },
      //       ],
      //     },
      //   };
      // }

      /////////////////////////////////////diskon?/////////////////////////////////////////////////////////////////////

      /////////////////////////////////////////////////////////////////////////////////////////////////////

      // await prisma.event.create({
      //   data: newEvent,
      // });

      res.send({
        success: true,
        message: "Event added successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  ////edit event
  async editEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        eventName,
        time,
        venue,
        image_url,
        description,
        categoryId,
        price,
        type,
        availableSeat,
      } = req.body;
      const editEvent: Prisma.EventUpdateInput = {
        eventName,
        time,
        venue,
        image_url: req.file?.filename,
        description,
        eventCategory: {
          connect: {
            id: Number(categoryId),
          },
        },
      };
      console.log(req.file);

      await prisma.event.update({
        data: editEvent,
        where: {
          id: Number(req.params.id),
        },
      });

      if (price && type == "Standard")
        await prisma.standardTicket.update({
          data: {
            ticketPrice: Number(price),
            availableSeat: Number(availableSeat),
          },
          where: {
            id: Number(req.params.id),
          },
        });
      else if (price && type == "VIP")
        await prisma.vIPTicket.update({
          data: {
            ticketPrice: Number(price),
            availableSeat: Number(availableSeat),
          },
          where: {
            id: Number(req.params.id),
          },
        });
      res.send({
        success: true,
        message: "Event edited successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.event.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
