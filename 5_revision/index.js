const express = require("express")

const app = express();
app.use(express.json())
const users = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 17 },
  { id: 3, name: "Carol", age: 30 },
];


app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((u)=>u.id===id)
  if(!user){
    return res.status(404).json({message:"user not found"})
  }
  res.json(user)
});

app.post("/users",(req,res)=>{
  const {name,age}=req.body;

  if(!name || !age){
    res.status(400).json("No user or age sent")
  }

  const user ={
    id:users.length+1,
    name,
    age
  }
  users.push(user)
  res.status(201).json(user);
})

app.put("/users/:id",(req,res)=>{
  const id = Number(req.params.id)
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const {name,age} = req.body
  if(!name) user.age=age
  if(!age) user.name=name
  
  res.status(201).json(users)
  // users.push(user)
})

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(index,1)
  res.json({ message: "User deleted" });

})
app.listen(3000,()=>{
  console.log("Server running on port 3000");
})