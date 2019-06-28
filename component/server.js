const express = require('express');

const server = express();
const port = 9002;

server.disable('x-powered-by');
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

server.use('/', express.static('./dist'));

server.listen(port, '0.0.0.0', () => {
    console.info(`Express server runs at: http://localhost:${port}`);
});
