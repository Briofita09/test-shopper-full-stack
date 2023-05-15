import { Request, Response } from "express";
import { Readable } from "stream";
import * as productService from "../services";

export async function checkProducts(req: Request, res: Response) {
  try {
    const result = await productService.checkProducts(req.file?.buffer);
    if (result.length) return res.status(406).json(result);
    return res.status(200).json("Preços podem ser alterados");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function editProducts(req: Request, res: Response) {
  try {
    const result = await productService.editProducts(req.file?.buffer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
