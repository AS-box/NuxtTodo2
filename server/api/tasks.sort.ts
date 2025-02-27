import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient().$extends(withAccelerate())
    const body = await readBody(event);
    let tasks;
    if(body.sort === '4'){
        tasks = await prisma.task.findMany();
    }else{
        tasks = await prisma.task.findMany({
            where:{
                status: body.sort
            }
        });
    }
    console.log(tasks);
    return tasks;
});