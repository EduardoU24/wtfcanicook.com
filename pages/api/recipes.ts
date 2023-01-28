import prisma from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next";
import email from "next-auth/providers/email";

export const SaveRecipe = async  function(req: NextApiRequest, res: NextApiResponse) {
    const session = await unstable_getServerSession(req, res, authOptions)
    const toReturn = {
        status: 404,
        message: 'Not Found'
    }
    if(!session || !session.user || !req.body?.recipes || !Array.isArray(req.body.recipes)){
        res.json(toReturn)
        res.status(toReturn.status)
        res.end()
        return
    }


    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string,
        }
    })
    if(!user || !user.id){
        res.json(toReturn)
        res.status(toReturn.status)
        res.end()
        return
    }

    let data = [];
    for(const recipe of req.body.recipes){
        data.push({
            prompt: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.preparation,
            videos: recipe.videos,
            userId: user.id
        })
    }

    const save = await prisma.recipe.createMany({data})

    toReturn.status = 200
    toReturn.message = 'OK'

    res.json(toReturn)
    res.status(toReturn.status)
    res.end()
}

export default SaveRecipe;