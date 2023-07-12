import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function getProjects(){
    const user = await getCurrentUser()

    const projects = db.project.findMany({
        where:{
            userId : user?.id
        },
        include:{
            tasks:true
        }
    })

    return projects
}