import { prisma } from "../database";

export async function getPack(id: number) {
  return await prisma.packs.findFirst({ where: { pack_id: id } });
}

export async function getPackByProduct(id: number) {
  const pack = await prisma.packs.findFirst({ where: { product_id: id } });
  if (pack) {
    return await prisma.packs.findMany({ where: { pack_id: pack.pack_id } });
  } else return [];
}
