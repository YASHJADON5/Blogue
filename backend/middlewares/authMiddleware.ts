import { verify } from 'hono/jwt'
import { Context, Next } from 'hono';



export const authMiddleware=async(c:Context,next:Next)=>{


    const header= c.req.header("authorization");
    // console.log("header", header)
    if(!header){
        // console.log("hell0")
        return c.json({
            error:"token not found error in auth"
        })
        

    }
   
    try{

        const user= await verify(header,c.env.JWT_KEY);
        if(user){
            c.set('userId', user.id);
            await next();
         }
         else{
             c.status(405)
             return c.json({error:"unauthorized"})
         }
    }
    catch(e){

       console.log(e);
        return  c.json({msg:"token verification error"})
    }
    // console.log("YAsh")
   

    


}