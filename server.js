import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connect.js';
import router from './router/route.js';
import mongoose from 'mongoose';

const app = express();
const CONNECTION_URL = "mongodb+srv://admin:wwwwww@cluster0.t5aoutx.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8000

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(201).json('Home GET Request');
})

// API routes
app.use('/api', router);

mongoose.connect(CONNECTION_URL)
    .then(() => {
        try {
            app.listen(process.env.PORT || port, () => {
                console.log(`Server connected to http://localhost:${port}`)
            })
        } catch (error) {
            console.log('cannot connect to the server')
        }
    }).catch(error => {
    console.log('ERROR Database:', error)
})



// start server only when we have valid connection
// connect().then(() => {
//     try {
//         app.listen(process.env.PORT || port, () => {
//             console.log(`Server connected to http://localhost:${port}`)
//         })
//     } catch (error) {
//         console.log('cannot connect to the server')
//     }
// }).catch(error => {
//     console.log('ERROR Database:', error)
// })