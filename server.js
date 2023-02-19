import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connect.js';
import router from './router/route.js';

const app = express();

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


// start server only when we have valid connection
connect().then(() => {
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