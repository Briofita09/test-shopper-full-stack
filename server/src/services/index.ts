import * as productRepository from "../repositories/productRepoisitories";
import * as packRepository from "../repositories/packsRepositories";
import { readCsv } from "../utils";
import { Product } from "../interfaces/products";

type Item = {
  product_code: string;
  new_price: string;
};

export async function checkProducts(file: any) {
  const errors = [];
  const list = await readCsv(file);
  for await (let item of list) {
    const product = await productRepository.findProduct(
      Number(item.product_code)
    );
    if (product) {
      if (item.new_price < product.cost_price) {
        const err = {
          [item.product_code]: "Preço do ítem abaixo do seu preço de custo",
        };
        errors.push(err);
      } else if (item.new_price > Number(product.sales_price) * 1.1) {
        const err = {
          [item.product_code]: "Preço do ítem maior do que 10% do custo atual",
        };
        errors.push(err);
      } else if (item.new_price < Number(product.sales_price) * 0.9) {
        const err = {
          [item.product_code]: "Preço do ítem menor do que 10% do custo atual",
        };
        errors.push(err);
      }
    }
  }
  return errors;
}

export async function editProducts(file: any) {
  const list = await readCsv(file);
  for (let item of list) {
    await productRepository.updateProduct(
      Number(item.product_code),
      item.new_price
    );
    const pack = await packRepository.getPack(Number(item.product_code));
    if (pack) {
      const newPrice = item.new_price / Number(pack.qty);
      await productRepository.updateProduct(Number(pack.product_id), newPrice);
    }
    const packByProduct = await packRepository.getPackByProduct(
      Number(item.product_code)
    );
    if (packByProduct.length) {
      let price = 0;
      for (let p of packByProduct) {
        const product = await productRepository.findProduct(
          Number(p.product_id)
        );
        price += Number(product?.sales_price) * Number(p.qty);
      }
      await productRepository.updateProduct(
        Number(packByProduct[0].pack_id),
        price
      );
    }
    return true;
  }
}

export async function getProducts(list: any) {
  const products: any[] = [];
  for (let i = 1; i < list.length; i++) {
    const item = await productRepository.findProduct(Number(list[i][0]));
    if (item)
      products.push({
        code: Number(item.code),
        name: item.name,
        costPrice: Number(item.cost_price),
        salePrice: Number(item.sales_price),
      });
  }
  return products;
}
