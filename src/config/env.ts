
import dotenv from 'dotenv';

const env: string = process.env.NODE_ENV || 'local';
const envData = dotenv.config({ path: `.env.${env}` });

export default envData.parsed;