import { Response, Request, NextFunction } from "express";

import express, { Router } from "express";
import { EventController } from "../controllers/events";
import { fileUploader } from "../middlewares/multer";

export const route: Router = express.Router();

route.get("/", EventController.getEvent);
route.get("/byid", EventController.getEventById);
route.post(
  "/",
  fileUploader({
    destinationFolder: "",
    prefix: "",
    filetype: "image",
  }).single("image"),
  EventController.addEvent
);
route.patch(
  "/",
  fileUploader({
    destinationFolder: "",
    prefix: "",
    filetype: "image",
  }).single("image"),
  EventController.editEvent
);
route.delete("/", EventController.deleteEvent);
