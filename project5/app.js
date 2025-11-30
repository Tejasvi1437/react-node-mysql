const express = require('express');
let app = express();
const port = 3000;

const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.resolve("./src/views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router =express.Router();
app.use(router);

const rootPath=path.reslove("./dist");
app.use(express.static(rootPath));

require("./src/database/connection");
require("./src/bootstraps")();

router.use((err,req,res,next)=>{
    if(err){
        return res(err.message);
    }
});
app.listen(port,err=>{
    if(err) return console.log('Cannot listen on port: ${port}');
    console.log('Server is listening on port: https://localhost:${port}');
});