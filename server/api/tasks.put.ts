import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient().$extends(withAccelerate())
    const body = await readBody(event);
    const id = body.id;
    const status = body.status;
    const title = body.title;
    let content = '';
    console.log(body);
    if(id && status){
        const changeState = await prisma.task.update({
            where:{
                id: parseInt(body.id)
            },
            data:{
                status: body.status
            }
        });
        content = JSON.stringify(changeState);
    }
    if(id && title){
        const changeTitle = await prisma.task.update({
            where:{
                id: parseInt(body.id)
            },
            data:{
                title: body.title
            }
        });
        content = JSON.stringify(changeTitle);
    }
    return content;  
});