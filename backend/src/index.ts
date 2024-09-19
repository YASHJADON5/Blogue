
import { Hono } from 'hono';
import { user } from '../routes/user'; 
import { blog } from '../routes/blog'
// import {authMiddleware} from '../middlewares/authMiddleware'

const app = new Hono<{
   Bindings:{
    JWT_KEY:string
   }
}>();

// app.use('/api/v1/blog/*',authMiddleware);


app.route('/api/v1', user);
app.route('/api/v1', blog);

export default app;
