import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'



const user = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_KEY:string
    }
}>();


user.post('/user/signup', async(c) => {
    
    // console.log(c.env.DATABASE_URL)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    
   
    const body = await c.req.json();
    
    const user=await prisma.user.create({
       data : {
        name: body.name,
        email : body.email,
        password : body.password,
       }
    })
    console.log(user.id)
     const key=c.env.JWT_KEY
     console.log(key);
    const token= await sign({ id:user.id},key)
    console.log(token)


  return c.json({jwt:token});
});

user.post('/user/signin', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())


    const body= await c.req.json();

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

    const key=c.env.JWT_KEY
    const token=  await sign({ id:user.id},key);
    
    return c.json({
        jwt:token
    });
  });

user.post('/blog', (c) => {
    console.log('Received GET request at /api/v1/y');
    return c.text('hello boi');
});
  
  
user.put('/blog', (c) => {
    console.log('Received GET request at /api/v1/y');
    return c.text('hello boi');
});


user.get('/blog/bulk',(c)=>{
    // console.log(c.env.DATABASE_URL)
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

  
    return c.text('recieved');
})

user.get('/blog/:id', (c) => {
    console.log('Received GET request at /api/v1/y');
    return c.text('hello boi');
});




export { user }; 