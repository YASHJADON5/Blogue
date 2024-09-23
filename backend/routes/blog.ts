import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createblogBody } from 'blogue-common'
import { updateblogBody } from 'blogue-common'





const blog= new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_KEY:string
    },
    Variables:{
        userId:string
    }
}>();


blog.use('/*',authMiddleware)


blog.post('/blog', async(c) => {
     
    const authorId=c.get('userId');
    
    const body= await c.req.json();
    if(!body){
        return  c.json({msg:"body is missing"});
    }
    const {success}= createblogBody.safeParse(body);
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
            const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            let date= new Date();
            let month= months[date.getMonth()];
            let day= date.getDate();
            let year=date.getFullYear();

            const finalDate= `${month} ${day}, ${year} `


            const blog= await prisma.blog.create({
               data:{
                title:body.title,
                content: body.content,
                authorId:authorId,
                published:true,
                date:finalDate
               }  
        
            })
        
            return c.text(blog.id);
        }
        catch(e){
            console.log(e)
            return  c.json({msg:"something breaks in update route"});
        }

    }
    catch(e){
        console.log(e)
       return  c.json({msg:"error while connecting to the db through accelerate"});    
   }

});
  
  
blog.put('/blog', async(c) => {
   
    
    const body= await c.req.json();

    if(!body){
        return  c.json({msg:"body is missing"});
    }
    const {success}= updateblogBody.safeParse(body);
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
            const blog= await prisma.blog.update({
                where:{
                    id:body.id
                },
               data:{
                title:body.title || undefined,
                content: body.content || undefined,
               }  
        
            })
        
            return c.text(blog.id);
        }
        catch(e){
            console.log(e)
            return  c.json({msg:"something breaks in update route"});
        }

    }
    catch(e){
        console.log(e)
       return  c.json({msg:"error while connecting to the db through accelerate"});    
   }

});


// add pagination

blog.get('/blog/bulk',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        try{
            const blog= await prisma.blog.findMany({
                include:{
                    author:true
                }

            });
        
            return c.json({
              blogs:blog
            });
        }
        catch(e){
            console.log(e);
            c.json({
                msg:"something breaks in bulk route"
            })
        }
    }
    catch(e){
         console.log(e)
        return  c.json({msg:"error while connecting to the db through accelerate"});    
    }
 
})

blog.get('/blog/:id', async(c) => {
    const id=  c.req.param("id");
    console.log(id);
    if(!id){
        return  c.json({msg:"parmas is missing"});
    }
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        
        try{
            const blog= await prisma.blog.findFirst({
                where:{
                    id:id
                },
                include:{
                    author:true
                }
        
            })
        
            return c.json({msg:blog});
    
        }
        catch(e){
            return  c.json({msg:"something breaks in :id route"});
        }
    }
    catch(e){
        console.log(e)
       return  c.json({msg:"error while connecting to the db through accelerate"});    
   }

});








export {blog}