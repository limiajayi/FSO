const http = require('http');

const app = http.createServer((request, response) => {
    // writes the header of the package
    response.writeHead(200, {'Content-Type': 'text/plain'});

    //writes the data of the package
    response.end('Hello World');
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);