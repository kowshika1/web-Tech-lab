const http = require('http');
const url = require('url');
const querystring = require('querystring');

function onRequest(req, res) {
    const path = url.parse(req.url).pathname;
    
    if (req.method === 'GET') {
        const query = url.parse(req.url, true).query;
        const name = query.name;
        const password = query.password;
        
        if (name === 'admin' && password === 'admin') {
            res.end('Login successful');
        } else {
            res.end('Invalid');
        }
    } else if (req.method === 'POST') {
        let body = '';
        
        req.on('data', function(data) {
            body += data;
        });
        
        req.on('end', function() {
            const postData = querystring.parse(body);
            const name = postData.name;
            const password = postData.password;
            
            if (name === 'admin' && password === 'admin') {
                res.end('Login successful');
            } else {
                res.end('Invalid');
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page not found');
    }
}

http.createServer(onRequest).listen(8082);
console.log("Server is started...");
