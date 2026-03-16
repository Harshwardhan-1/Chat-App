import dotenv from 'dotenv';
dotenv.config({
     path:`.env.${process.env.NODE_ENV || "development"}.local`
})

export const {
    MONGO_URL,
    FRONTEND_URL,
    GROQ_API_KEY,
    PORT,
    SALT_ROUND,
    JWT_SECRET,
}=process.env;  