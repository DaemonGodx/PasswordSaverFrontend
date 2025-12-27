import dotenv from 'dotenv';
dotenv.config();

const config={
    VITE_BASE_URL:process.env.VITE_BASE_URL, 
};
export default config;