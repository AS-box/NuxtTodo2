import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient().$extends(withAccelerate())
    const body = await readBody(event);
    const newTask = await prisma.task.create({
        data:{
            title: body.title,
            status: body.status
        }
    });
    return newTask;
});