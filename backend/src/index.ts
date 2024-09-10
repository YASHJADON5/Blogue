
import { Hono } from 'hono';
import { user } from '../routes/';  // Import user router

const app = new Hono();

// Mount user routes under '/api/v1'
app.route('/api/v1', user);

export default app;  // Export the main app instance
