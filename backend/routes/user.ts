import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import {  sign } from 'hono/jwt'
import { signUpBody } from 'blogue-common'
import { signInBody } from 'blogue-common'






const user = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_KEY:string
    }
}>();


user.post('/user/signup', async(c) => {
    
    const body = await c.req.json();
    if(!body){
        return c.json({
            msg:"signup body is missing"
        })
    }
    const {success}= signUpBody.safeParse(body)
    if(!success){
        return c.json({
            msg:" body parsing failed"
        })
    }

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
    
        
       
    
        try{
            const user=await prisma.user.create({
                data : {
                 name: body.name,
                 email : body.email,
                 password : body.password,
                }
             })
           const token= await sign({ id:user.id},c.env.JWT_KEY)
           return c.json({jwt:token});
        }
        catch(err){
            c.status(411)
            return c.json({msg:"email already registerd"})
        }
        

    }
    catch(e){
        console.log(e);
        return c.json({msg:"something breaks in signin request"});
    }
   
    
});

user.post('/user/signin', async(c) => {

    const body = await c.req.json();
    if(!body){
        return c.json({
            msg:"signup body is missing"
        })
    }
    const {success}= signInBody.safeParse(body)
    if(!success){
        return c.json({
            msg:" body parsing failed"
        })
    }


    try{
            
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())


        
        
        try{
            const user= await prisma.user.findUnique({
                where:{
                    email:body.email,
                    password:body.password,         
                }
            })
            if(!user){
                c.status(403);
                return c.json({error:"user not found"});
            }
            const token=  await sign({ id:user.id},c.env.JWT_KEY);
            
            return c.json({
                jwt:token
            });

        }
        catch(e){
            console.log(e);
            return c.json({msg:"something breaks in signin request"});
        }
    
    }
    catch(e){
      c.json({
        msg: "error while connecting prima accelerate"
      })
    }

  });



export { user }; 