import http from 'http';
import fs from 'fs';

const server = http.createServer((req , res) => {
    const { url, method } = req;
    console.log(`URL: ${url} - Method: ${method}`);        
    // res.writeHead(200, { 'Content-Type':'text/plain'});
 
 if(url === '/json'){
    res.writeHead(200, { 'Content-Type':'application/json'});
    const data = fs.createReadStream('./employees.json');
   
    data.pipe(res);
    data.on('error', (err) => {
      console.error("Response error:", err);
      res.end(err);
    });    
  }else if(url === '/'){
    res.writeHead(200, { 'Content-Type':'text/html'});
    const data = fs.createReadStream('./EmployeeList.html');
   
    data.pipe(res);
    data.on('error', (err) => {
      console.error("Response error:", err);
      res.end(err);
    });    
  }  
  else if( method === 'GET' && url === '/astronomyLink'){
    res.writeHead(200, { 'Content-Type':'image/png'});
    const data = fs.createReadStream('./astronomy.jpg');
   
    data.pipe(res);
    data.on('error', (err) => {
      console.error("Response error:", err);
      res.end(err);
    });    
  }else if( method === 'GET' && url === '/astronomy'){
    res.writeHead(200, { 'Content-Type':'text/html'});
    const data = fs.createReadStream('./astronomy.html');
   
    data.pipe(res);
    data.on('error', (err) => {
      console.error("Response error:", err);
      res.end(err);
    });    
  }
  else{
    res.writeHead(200, { 'Content-Type':'text/html'});
      res.end('<h1> 404 Not found Page  </h1>');            
  }


});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});



