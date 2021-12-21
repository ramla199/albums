const express = require('express');

const app = express();

app.get('/', function (request, response) {
    response.send("hello Express world!")
});

//Start our server so that it listens for HTTP requests!
app.listen(process.env.PORT);
