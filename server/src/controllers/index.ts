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
    if (result === undefined)
      return res.status(500).json({ message: "Internal Server Error" });
    return res.status(200).json({ message: "Preços alterados" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await productService.getProducts(req.body);
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
