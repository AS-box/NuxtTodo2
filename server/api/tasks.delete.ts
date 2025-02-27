import { PrismaClient } from "@prisma/client";


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const body = await readBody(event);
    const deleteTask = await prisma.task.delete({
        where:{
            id: parseInt(body.id)
        }
    });
    return deleteTask;
});