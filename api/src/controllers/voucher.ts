import express, { Response, Request, NextFunction } from "express";

export const VoucherController = {
  getVoucher(req: Request, res: Response, next: NextFunction) {
    res.send("test");
  },
  getVoucherById(req: Request, res: Response, next: NextFunction) {
    res.send("test");
  },
  addVoucher(req: Request, res: Response, next: NextFunction) {
    res.send("test");
  },
  editVoucher(req: Request, res: Response, next: NextFunction) {
    res.send("test");
  },
  deleteVoucer(req: Request, res: Response, next: NextFunction) {
    res.send("test");
  },
};
