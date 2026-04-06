const fs = require("fs");

const rContent = fs.readFileSync("data.json","utf-8");
const content = JSON.parse(rContent);

const activeUsers = content.filter((c)=>c["active"]===true && c["age"]>=18)
for (let i = 0; i < activeUsers.length; i++) {
  activeUsers[i]["message"]="Welcome, Alice";
  console.log(activeUsers[i]); 
}

fs.writeFileSync("output.json",JSON.stringify(activeUsers))