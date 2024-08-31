import dotenv from "dotenv";
dotenv.config();

const Config = {
    port: process.env.PORT || 3001,
    db_url: process.env.MONGO_URL
}

export default Config;