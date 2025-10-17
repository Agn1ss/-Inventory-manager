import 'dotenv/config';
import userRouter from './routers/user-router.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());                        
app.use(cookieParser());  

app.use('/api/user', userRouter);

const start = async () => {
    app.listen(PORT, (err) => {
        if (err) {
            console.error('Server failed to start:', err);
            return;
        }
        console.log(`Server started on port ${PORT}`);
    });
}

start()