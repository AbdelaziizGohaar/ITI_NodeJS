import fs from 'fs';
import { json } from 'stream/consumers';

export function createEmp(data){
fs.writeFileSync('./employees.json',JSON.stringify(data,null,2));
}

export function ListEmp(){
if (!fs.existsSync('./employees.json')) {
  return []  
}else{
    return JSON.parse(fs.readFileSync('./employees.json'));
}

}
