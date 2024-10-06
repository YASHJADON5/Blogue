import OpenAI from 'openai';
const apikey= import.meta.env.VITE_OPENAI_API_KEY



const client = new OpenAI({
  apiKey: apikey, 
  dangerouslyAllowBrowser:true,
});

export default client