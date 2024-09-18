
import { Hono } from 'hono';
import { user } from '../routes/';  // Import user router
import {authMiddleware} from '../middlewares/authMiddleware'

const app = new Hono<{
   Bindings:{
    JWT_KEY:string
   }
}>();

app.use('/api/v1/blog/*',authMiddleware);


app.route('/api/v1', user);

export default app;
