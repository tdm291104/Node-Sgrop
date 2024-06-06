const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use(express.json())


const data = JSON.parse(fs.readFileSync('data.json'))

app.use((req, res, next)=>{
  console.log(">>>> Check new request")
  console.log("host: ", req.hostname)
  console.log("path: ", req.path)
  console.log("method: ", req.method)
  next()
})

app.get('/', (req, res) => {
  res.send("Hello World!!!!!!!!")
})

app.get('/api/users', (req, res) => {
  res.json(data);
})

app.get('/api/users/:id', (req, res) => {
  const id = req.params.id
  let usercheck = false
  data.forEach((e) => {
    if(id == e.id)
      res.json(e)
      usercheck = true
    });
  if(!usercheck){
    res.send("Fail")
  }
})

function Checknamereq(req, res, next){
  const name = req.body.name;
  if(!name){
    return res.send("Error");
  }
  next()
}

app.post('/api/users', Checknamereq, (req, res) => {
  req.body.id = parseInt(data[(data.length)-1].id)+1
  data.push(req.body)
  fs.writeFileSync('data.json', JSON.stringify(data))
  res.send("Success")
})

app.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const update = req.body
  let usercheck = false;
  data.forEach((e,x) => {
    if(e.id == id){
      data[x].name = update.name
      usercheck = true
    }
  })
  if(usercheck){
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.send("Susses")
  }
  else{
    res.send("Fail")
  }
})

app.delete('/api/users/:id', (req, res) =>{
  const id = req.params.id;
  let usercheck = false;
  data.forEach((e,x)=>{
    if(e.id == id){
      usercheck = true
      data.splice(x,1)
    }
  })
  if(usercheck){
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.send("Susses")
  }
  else{
    res.send("Fail")
  }
})



app.use((req, res)=>{
  res.send("404 not found")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//commit main