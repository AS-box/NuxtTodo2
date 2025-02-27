import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient().$extends(withAccelerate())
    const body = await readBody(event);
    const deleteTask = await prisma.task.delete({
        where:{
            id: parseInt(body.id)
        }
    });
    return deleteTask;
});