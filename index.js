const express = require('express');
const server = express();
const port = /* process.env.PORT || */ 3333;

server.get('/', (req, res) => res.send('Hello World!'));

server.listen(port, () => console.log(`Server listening on port ${port}`));
