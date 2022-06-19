//const http = require('http');
//const hostname = '127.0.0.1';
//const port = 3000;

//const server = http.createServer((req,resp) => {

//    resp.statusCode = 200;
//    resp.setHeader('Content-type', 'text-plain');
//   resp.end('Mi segunda API')


//  }
//)
//server.listen(port, hostname);


const express = require('express');
const app = express();
const port = 4000;
app.use(express.json());

//routes
const userRoutes   = require("./app/routes/users.routes");
app.use('/users', userRoutes);


app.listen(port);

