import http, { get } from 'http';
import fs from 'fs';
import { createEmp, ListEmp } from "./crud.js";


/// Generic method 
const sendResponse = (res, filePath, contentType) => {
  res.writeHead(200, { 'Content-Type': contentType });
  const data = fs.createReadStream(filePath);
  
  data.pipe(res);
  data.on('error', (err) => {
      console.error("Response error:", err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end("Internal Server Error");
  });
};




/// Server code 

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(`URL: ${url} - Method: ${method}`);

  if (url === '/json') {
    sendResponse(res, './employees.json', 'application/json');

  } else if (url === '/') {
    sendResponse(res, './EmployeeList.html', 'text/html');

  }
  else if (method === 'GET' && url === '/astronomyLink') {
    sendResponse(res, './astronomy.jpg', 'image/png');

  }else if (method === 'GET' && url === '/serbalLink') {
    sendResponse(res, './serbal.jpg', 'image/png');

  } else if (method === 'GET' && url === '/astronomy') {
    sendResponse(res, './astronomy.html', 'text/html');

  }
  else if (method === 'GET' && url === '/serbal') {
    sendResponse(res, './serbal.html', 'text/html');

  }
  else if (method === 'GET' && url === '/style.css') {
    sendResponse(res, './style.css', 'text/css');
  }else if (method === 'POST' && url === '/Employees') {
   
   let body = '';
    req.on('data',(chunk)=>{
      body += chunk.toString();
    })

    req.on('end',()=>{
     const newEmployee = JSON.parse(body);
     const Employees = ListEmp(); 
     const id = Employees.length > 0 ? Employees[Employees.length - 1].ID + 1 : 1;     
     //XXXXXX
     newEmployee.ID = id;
      Employees.push(newEmployee);
      createEmp(Employees);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Employee added successfully",
          employee: newEmployee,
      }));

    })

  }
  else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1> 404 Not found Page  </h1>');
  }


});


server.listen(3000, () => {
  console.log('Server is running on port 3000');
});


