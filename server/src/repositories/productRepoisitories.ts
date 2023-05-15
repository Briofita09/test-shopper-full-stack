import { prisma } from "../database";

export async function updateProduct(id: any, price: any) {
  return await prisma.products.update({
    where: { code: id },
    data: {
      sales_price: price,
    },
  });
}

export async function findProduct(id: number) {
  return await prisma.products.findUnique({
    where: { code: id },
  });
}
