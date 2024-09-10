import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';



const user = new Hono<{
    Bindings:{
        DATABASE_URL: string
    }
}>();


user.post('/user/signup', async(c) => {
    

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    
   
    const body = await c.req.json();
    
    await prisma.user.create({
       data : {
        name: body.name,
        email : body.email,
        password : body.password,
       }
    })


  return c.text('hello boi');
});

user.post('/user/signin', (c) => {
    console.log('Received GET request at /api/v1/y');
    return c.text('hello boi');
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
    console.log(c.env.DATABASE_URL)
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