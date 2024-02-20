import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
// import cors from "cors";
import { config } from "dotenv";

export const prisma = new PrismaClient();
export const secretKey = String(process.env.secretKey);

const app: Application = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

//routes
app.use("/users", routes.userRoutes);
app.use("/event", routes.eventsRoutes);
app.use("voucher", routes.voucherRoutes);

//error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || "internal server error" });
});

//page not found handler
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found");
});

app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});
