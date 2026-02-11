import prisma from "@/lib/prisma";

export async function getFirstUser() {
  return prisma.user.findFirst({
    orderBy: { id: "asc" },
  });
}
