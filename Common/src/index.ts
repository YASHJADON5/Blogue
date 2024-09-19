import z from 'zod';

export const signUpBody = z.object({
name: z.string(),
email:z.string().email(),
password:z.string()
})


export type signUpInputType = z.infer<typeof signUpBody>;


export const signInBody = z.object({
    email:z.string().email(),
    password:z.string()
})
    
export type signInInputType = z.infer<typeof signInBody>;


export const createblogBody = z.object({
    title:z.string(),
    content:z.string()
})
    
export type createblogBodyType = z.infer<typeof createblogBody>;




export const updateblogBody = z.object({
    id:z.string(),
    title:z.string(),
    content:z.string()
})
    
export type updateblogBodyType = z.infer<typeof updateblogBody>;