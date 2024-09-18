import { verify } from 'hono/jwt'
import { Context, Next } from 'hono';


export const authMiddleware=async(c:Context,next:Next)=>{


    const header= c.req.header("authorization");

    if(!header){
        return c.json({
            error:"token not found error in auth"
        })
    }
    
    console.log(header);
    const response= await verify(header,c.env.JWT_KEY);

    if(response.id){
       await next()
    }
    else{
        c.status(405)
        return c.json({error:"unauthorized"})
    }



}