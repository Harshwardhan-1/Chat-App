import z from 'zod';
export const userSchema=z.object({
    name:z.string().min(3),
    userName:z.string().min(3),
    email:z.string(),
    password:z.string(),
});




export const userLoginSchema=z.object({
    email:z.string(),
    password:z.string(),
})