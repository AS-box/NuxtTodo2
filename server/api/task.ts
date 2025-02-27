import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

export default defineEventHandler(async () => {
    const prisma = new PrismaClient().$extends(withAccelerate())
    const tasks = await prisma.task.findMany();
    return tasks;
});