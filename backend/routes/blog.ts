import {Hono} from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createblogBody } from 'blogue-common'
import { updateblogBody } from 'blogue-common'
import { convert } from 'html-to-text';





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
    // const id = c.req.param("id")
    const authorId = c.get('userId');

    console.log(body);

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
                    id:body.id,
                    authorId:authorId
                },
               data:{
                title:body.title || undefined,
                content: body.content || undefined,
               }  
        
            })
        
            return c.json(blog);
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

blog.delete('/delete/:id', async(c)=>{
    const authorId=c.get('userId');
    const id=  c.req.param("id");
    
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        

        try{

            const response = await prisma.blog.delete({
                where:{
                    id:id,
                    authorId:authorId
                }
            })

            console.log(response)
            c.status(200)
            return c.json({"msg":"blog deleted successfully"})
            


        }
        catch(e){
            console.log(e)
            return  c.json({msg:"something breaks in delete route"});
        }


    }
     catch(e){
      c.json({msg:"error while connecting to the db through accelerate"});    

     }
})


// add pagination

blog.get('/blog/bulk',async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())
        try{
            const blogs = await prisma.blog.findMany({
                include: {
                  author: {
                    select: {
                      name: true
                    }
                  }
                }
              });
            const sanitizedBlogs = blogs.map((blog) => ({
                ...blog,
                content: convert(blog.content), 
            }));

            return c.json({
                blogs: sanitizedBlogs,
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




blog.post('/saveblog',async(c)=>{
    
    console.log("YAsh")
    const body= await c.req.json();
    const authorId=c.get('userId');

    if(!body){
        c.status(404);
        return c.json({msg:"body not found"})
    }

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        try{
            const existingSavedBlog = await prisma.savedBlogs.findUnique({
                where: {
                    userId_blogId: {
                        userId: authorId,
                        blogId: body.id,
                    },
                },
            });
    
            if (existingSavedBlog) {
                return c.json({ msg: "Blog already saved" });
            }
    
            const response= await prisma.savedBlogs.create({
               data:{
                user: { connect: { id: authorId } },
                blog: { connect: { id: body.id } },
               }
            })

            console.log(response);
            return c.json({"msg":"blog saved successfully"})
        }
        catch(e){
            console.log("error while saving blog");
            c.status(500); 
            return c.json({ msg: "Error while saving blog", error: e.message }); 
        }

    }
    catch(e){
        return c.json({ msg: "Error while connecting to the db", error: e.message });
    }

})


blog.delete('/unsaveblog',async(c)=>{
    const body= await c.req.json();
    const authorId=c.get('userId');

    if(!body){
        c.status(404);
        return c.json({msg:"body not found"})
    }

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        try{
            const response= await prisma.savedBlogs.delete({
                where: {
                    userId_blogId: {
                        userId: authorId,
                        blogId: body.id,
                    },
                },
            })

            console.log(response);
            return c.json({"msg":"blog unsaved successfully"})
        }
        catch(e){
            
            return c.json({ msg: "Error while unsaving blog", error: e.message }); 
        }

    }
    catch(e){
        return c.json({ msg: "Error while connecting to the db", error: e.message });

    }

})


blog.get('/fetchSavedBlogs',async(c)=>{
    const authorId=c.get('userId');
   

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        try{

            const blogs= await prisma.savedBlogs.findMany({
                where:{
                    userId:authorId
                },
                 select:{
                     blogId:true
                }
                
            })
           

            return c.json(blogs)

        }
        catch(e){
            return c.json({ msg: "Error while fetching saved blogs", error: e.message }); 

        }

    }
    catch(e){
        return c.json({ msg: "Error while connecting to the db", error: e.message });

    }

})

blog.get('/savedbyuser',async(c)=>{
    const authorId=c.get('userId');
   

    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        try{

            const blogs = await prisma.savedBlogs.findMany({
                where: {
                    userId: authorId
                },
                include: {
                    blog: {
                        include: {
                            author: {
                                select: {
                                    name: true  
                                }
                            }
                        }
                    },
                    user:{
                        select:{
                            name:true
                        }
                    }
                }
            });

            // if(blogs.length===0){
            //     let arr=
            //     c.
            // }
            blogs.forEach((blog) => {
                blog.blog.content = convert(blog.blog.content);              
            });
         
            console.log(blogs)

            
            return c.json(blogs)

        }
        catch(e){
            return c.json({ msg: "Error while fetching saved blogs", error: e.message }); 

        }

    }
    catch(e){
        return c.json({ msg: "Error while connecting to the db", error: e.message });

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
            const blogs= await prisma.blog.findFirst({
                where:{
                    id:id
                },
                include:{
                    author:true
                }
        
            })
            console.log(blogs)

        
            const sanitizedBlogs = ({
                ...blogs,
                content: convert(blogs?.content), 
            });
            console.log(blogs)
            return c.json(sanitizedBlogs)
    
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