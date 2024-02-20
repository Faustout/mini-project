import { Response, Request, NextFunction } from "express";

import express, { Router } from "express";
import { VoucherController } from "../controllers/voucher";

export const route: Router = express.Router();

route.get("/", VoucherController.getVoucher);
route.get("/byid", VoucherController.getVoucherById);
route.post("/", VoucherController.addVoucher);
route.patch("/", VoucherController.editVoucher);
route.delete("/", VoucherController.deleteVoucer);
