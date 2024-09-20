
import { Hono } from 'hono';
import { user } from '../routes/user'; 
import { blog } from '../routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
   Bindings:{
    JWT_KEY:string
   }
}>();


app.use('/*',cors());
app.route('/api/v1', user);
app.route('/api/v1', blog);

export default app;
